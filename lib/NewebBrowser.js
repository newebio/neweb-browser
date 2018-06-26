"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const neweb_core_1 = require("neweb-core");
const rxjs_1 = require("rxjs");
class NewebBrowser {
    constructor(config) {
        this.config = config;
        this.serverTransport = {
            onConnect: new rxjs_1.Subject(),
        };
        this.server = neweb_core_1.Server.create({
            ControllersFactory: {
                create: (frameName, props) => {
                    const ControllerModule = this.config.resolveModule("frames/" + frameName + "/controller");
                    if (!ControllerModule) {
                        return new neweb_core_1.BaseController(props);
                    }
                    return new ControllerModule.default(props);
                },
            },
            RoutersFactory: {
                createRouter: () => {
                    const RouterModule = this.config.resolveModule("Router");
                    if (!RouterModule) {
                        // tslint:disable-next-line:max-classes-per-file
                        return new class extends neweb_core_1.ClassicRouter {
                            onInit() {
                                this.addRoute(neweb_core_1.MatchedRoute({ path: "/" }, neweb_core_1.PageRouteByFrame({
                                    frameName: "index",
                                })));
                            }
                        }();
                    }
                    return new RouterModule.default();
                },
            },
            transport: this.serverTransport,
        });
        const clientTransport = {
            onConnect: new rxjs_1.Subject(),
            onConnecting: new rxjs_1.Subject(),
            onDisconnect: new rxjs_1.Subject(),
            inputMessage: new rxjs_1.Subject(),
            outputMessage: new rxjs_1.Subject(),
        };
        this.clientTransport = clientTransport;
    }
    start({ url }) {
        this.server.start();
        const client = new neweb_core_1.Client({
            transport: this.clientTransport,
            url,
        });
        const renderer = new neweb_core_1.ClientPageRenderer({
            RendererComponentsFactory: {
                create: (frameName, props) => {
                    const ViewModule = this.config.resolveModule("frames/" + frameName + "/view");
                    if (!ViewModule) {
                        return {};
                    }
                    return new ViewModule.default(props);
                },
            },
            renderRootComponent: (component) => {
                this.config.renderRootComponent(component);
            },
            replaceRootComponent: (component) => {
                this.config.replaceRootComponent(component);
            },
        });
        client.onNewPage.subscribe(renderer.emitNewPage);
        client.onChangeNavigateStatus.subscribe(renderer.onChangeNavigateStatus);
        client.onChangeNetworkStatus.subscribe(renderer.onChangeNetworkStatus);
        client.onControllerMessage.subscribe(renderer.onControllerMessage);
        renderer.emitControllerMessage.subscribe(client.emitControllerMessage);
        renderer.onNavigate.subscribe((p) => client.emitNavigate.next({ url: p }));
        const serverTransportClient = {
            getExtraInfo: () => null,
            getSessionId: () => "",
            inputMessage: new rxjs_1.Subject(),
            outputMessage: new rxjs_1.Subject(),
        };
        serverTransportClient.outputMessage.subscribe((message) => {
            debug("neweb-browser")("server transport output message", message);
            this.clientTransport.inputMessage.next(message);
        });
        this.clientTransport.outputMessage.subscribe((message) => {
            debug("neweb-browser")("client transport output message", message);
            serverTransportClient.inputMessage.next(message);
        });
        this.serverTransport.onConnect.next(serverTransportClient);
        this.clientTransport.onConnect.next();
    }
}
exports.NewebBrowser = NewebBrowser;
exports.default = NewebBrowser;
