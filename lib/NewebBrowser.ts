import debug = require("debug");
import {
    BaseController,
    ClassicRouter,
    Client,
    ClientPageRenderer,
    IClientTransportInputMessage,
    IClientTransportOutputMessage,
    IServerTransportClient,
    IServerTransportClientInputMessage,
    IServerTransportClientOutputMessage,
    MatchedRoute,
    PageRendererComponent,
    PageRouteByFrame,
    Server,
} from "neweb-core";
import { Subject } from "rxjs";
export class NewebBrowser {
    public server: Server;
    protected clientTransport: any;
    protected serverTransport: any;
    constructor(
        protected config: {
            resolveModule: (modulePath: string) => any;
            renderRootComponent: (
                component: PageRendererComponent,
            ) => void | Promise<void>;
            replaceRootComponent: (
                component: PageRendererComponent,
            ) => void | Promise<void>;
        },
    ) {
        this.serverTransport = {
            onConnect: new Subject<IServerTransportClient>(),
        };
        this.server = Server.create({
            ControllersFactory: {
                create: (frameName, props) => {
                    const ControllerModule = this.config.resolveModule(
                        "frames/" + frameName + "/controller",
                    );
                    if (!ControllerModule) {
                        return new BaseController<any>(props);
                    }
                    return new ControllerModule.default(props);
                },
            },
            RoutersFactory: {
                createRouter: () => {
                    const RouterModule = this.config.resolveModule("Router");
                    if (!RouterModule) {
                        // tslint:disable-next-line:max-classes-per-file
                        return new class extends ClassicRouter {
                            public onInit() {
                                this.addRoute(
                                    MatchedRoute(
                                        { path: "/" },
                                        PageRouteByFrame({
                                            frameName: "index",
                                        }),
                                    ),
                                );
                            }
                        }();
                    }
                    return new RouterModule.default();
                },
            },
            transport: this.serverTransport,
        });

        const clientTransport = {
            onConnect: new Subject(),
            onConnecting: new Subject(),
            onDisconnect: new Subject(),
            inputMessage: new Subject<IClientTransportInputMessage>(),
            outputMessage: new Subject<IClientTransportOutputMessage>(),
        };

        this.clientTransport = clientTransport;
    }
    public start({ url }: { url: string }) {
        this.server.start();
        const client = new Client({
            transport: this.clientTransport as any,
            url,
        });
        const renderer = new ClientPageRenderer({
            RendererComponentsFactory: {
                create: (frameName: string, props) => {
                    const ViewModule = this.config.resolveModule(
                        "frames/" + frameName + "/view",
                    );
                    if (!ViewModule) {
                        return {};
                    }
                    return new ViewModule.default(props);
                },
            },
            renderRootComponent: (component: any) => {
                this.config.renderRootComponent(component);
            },
            replaceRootComponent: (component: any) => {
                this.config.replaceRootComponent(component);
            },
        });
        client.onNewPage.subscribe(renderer.emitNewPage);
        client.onChangeNavigateStatus.subscribe(
            renderer.onChangeNavigateStatus,
        );
        client.onChangeNetworkStatus.subscribe(renderer.onChangeNetworkStatus);
        client.onControllerMessage.subscribe(renderer.onControllerMessage);
        renderer.emitControllerMessage.subscribe(client.emitControllerMessage);
        renderer.onNavigate.subscribe((p) =>
            client.emitNavigate.next({ url: p }),
        );

        const serverTransportClient = {
            getExtraInfo: () => null,
            getSessionId: () => "",
            inputMessage: new Subject<IServerTransportClientInputMessage>(),
            outputMessage: new Subject<IServerTransportClientOutputMessage>(),
        };
        serverTransportClient.outputMessage.subscribe((message) => {
            debug("neweb-browser")("server transport output message", message);
            this.clientTransport.inputMessage.next(message);
        });
        this.clientTransport.outputMessage.subscribe((message: any) => {
            debug("neweb-browser")("client transport output message", message);
            serverTransportClient.inputMessage.next(message);
        });
        this.serverTransport.onConnect.next(serverTransportClient);
        this.clientTransport.onConnect.next();
    }
}
export default NewebBrowser;
