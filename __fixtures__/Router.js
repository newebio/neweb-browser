"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
class Router extends neweb_core_1.ClassicRouter {
    onInit() {
        this.addRoute(neweb_core_1.MatchedRoute({ path: ".*/" }, neweb_core_1.PageRouteByFrame({
            frameName: "index",
            params: () => ({
                end: "!",
            }),
        })));
        this.addRoute(neweb_core_1.MatchedRoute({ path: ".*/index2" }, neweb_core_1.PageRouteByFrame({
            frameName: "index2",
            params: () => ({
                end: "!!!",
            }),
        })));
        this.addRoute(neweb_core_1.MatchedRoute({ path: ".*/index3" }, neweb_core_1.PageRouteByFrame({
            frameName: "index3",
            params: () => ({
                end: ".",
            }),
        })));
    }
}
exports.Router = Router;
exports.default = Router;
