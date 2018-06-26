"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
class Router extends neweb_core_1.ClassicRouter {
    onInit() {
        this.addRoute(neweb_core_1.MatchedRoute({ path: "/" }, neweb_core_1.PageRouteByFrame({
            frameName: "index",
            params: () => ({
                end: "!",
            }),
        })));
    }
}
exports.Router = Router;
exports.default = Router;
