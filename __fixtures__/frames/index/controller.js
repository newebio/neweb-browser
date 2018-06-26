"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
class IndexController extends neweb_core_1.BaseController {
    init() {
        return {
            name: "Neweb",
        };
    }
}
exports.IndexController = IndexController;
exports.default = IndexController;
