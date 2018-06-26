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
const sleep_es6_1 = require("sleep-es6");
const _1 = require(".");
const moduleResolver = (path) => {
    return require.requireActual(__dirname + "/__fixtures__/" + path);
};
describe("render neweb components", () => {
    let history;
    let div;
    beforeEach(() => {
        history = {
            pushState: jest.fn(),
            replaceState: jest.fn(),
        };
        div = document.createElement("div");
    });
    it("render", () => __awaiter(this, void 0, void 0, function* () {
        _1.render({
            root: div,
            resolveModule: moduleResolver,
            url: "/",
            history: history,
        });
        yield sleep_es6_1.default(10);
        expect(div.innerHTML).toBe(`<div>Hello, Neweb!</div>`);
    }));
    it("navigate", () => __awaiter(this, void 0, void 0, function* () {
        _1.render({
            root: div,
            resolveModule: moduleResolver,
            url: "/",
            history: history,
        });
        yield sleep_es6_1.default(10);
        history.pushState("/index2", "", "/index2");
        yield sleep_es6_1.default(10);
        expect(div.innerHTML).toBe(`<div>Bye, Page!!!</div>`);
    }));
    it("controller messages", () => __awaiter(this, void 0, void 0, function* () {
        _1.render({
            root: div,
            resolveModule: moduleResolver,
            url: "/index3",
            history: history,
        });
        yield sleep_es6_1.default(10);
        expect(div.innerHTML).toBe(`<div>Yes, <span name="name">Value</span>.</div>`);
        yield sleep_es6_1.default(200);
        expect(div.innerHTML).toBe(`<div>Yes, <span name="name">NewValue</span>.</div>`);
        div.querySelector("[name]").click();
        yield sleep_es6_1.default(200);
        expect(div.innerHTML).toBe(`<div>Yes, <span name="name">PostMessage</span>.</div>`);
    }));
});
