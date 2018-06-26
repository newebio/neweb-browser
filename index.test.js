"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("render neweb components", () => {
    it("render", () => __awaiter(this, void 0, void 0, function* () {
        const div = document.createElement("div");
        _1.render({
            root: div,
            resolveModule: (path) => require(__dirname + "/__fixtures__/" + path),
            url: "/",
        });
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        expect(div.innerHTML).toBe(`<div>Hello, Neweb!</div>`);
    }));
});
