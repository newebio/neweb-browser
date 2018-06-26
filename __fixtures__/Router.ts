import { ClassicRouter, MatchedRoute, PageRouteByFrame } from "neweb-core";

export class Router extends ClassicRouter {
    onInit() {
        this.addRoute(
            MatchedRoute(
                { path: ".*/" },
                PageRouteByFrame({
                    frameName: "index",
                    params: () => ({
                        end: "!",
                    }),
                }),
            ),
        );
        this.addRoute(
            MatchedRoute(
                { path: ".*/index2" },
                PageRouteByFrame({
                    frameName: "index2",
                    params: () => ({
                        end: "!!!",
                    }),
                }),
            ),
        );
        this.addRoute(
            MatchedRoute(
                { path: ".*/index3" },
                PageRouteByFrame({
                    frameName: "index3",
                    params: () => ({
                        end: ".",
                    }),
                }),
            ),
        );
    }
}
export default Router;
