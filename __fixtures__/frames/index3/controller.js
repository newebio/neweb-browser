"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
class Index3Controller extends neweb_core_1.BaseController {
    init() {
        setTimeout(() => {
            this.onMessage.next("NewValue");
        }, 100);
        this.postMessage.subscribe((message) => this.onMessage.next(message));
        return {
            name: "Value",
        };
    }
}
exports.Index3Controller = Index3Controller;
exports.default = Index3Controller;
