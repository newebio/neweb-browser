import { ClassicRouter, MatchedRoute, PageRouteByFrame } from "neweb-core";

export class Router extends ClassicRouter {
    onInit() {
        this.addRoute(
            MatchedRoute(
                { path: "/" },
                PageRouteByFrame({
                    frameName: "index",
                    params: () => ({
                        end: "!",
                    }),
                }),
            ),
        );
    }
}
export default Router;
