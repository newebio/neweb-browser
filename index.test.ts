import sleep from "sleep-es6";
import { render } from ".";
const moduleResolver = (path: string) => {
    return require.requireActual(__dirname + "/__fixtures__/" + path);
};
describe("render neweb components", () => {
    let history: {
        pushState: jest.Mock<any>;
        replaceState: jest.Mock<any>;
    };
    let div: HTMLElement;
    beforeEach(() => {
        history = {
            pushState: jest.fn(),
            replaceState: jest.fn(),
        };
        div = document.createElement("div");
    });
    it("render", async () => {
        render({
            root: div,
            resolveModule: moduleResolver,
            url: "/",
            history: history as any,
        });
        await sleep(10);
        expect(div.innerHTML).toBe(`<div>Hello, Neweb!</div>`);
    });
    it("navigate", async () => {
        render({
            root: div,
            resolveModule: moduleResolver,
            url: "/",
            history: history as any,
        });
        await sleep(10);
        history.pushState("/index2", "", "/index2");
        await sleep(10);
        expect(div.innerHTML).toBe(`<div>Bye, Page!!!</div>`);
    });
    it("controller messages", async () => {
        render({
            root: div,
            resolveModule: moduleResolver,
            url: "/index3",
            history: history as any,
        });
        await sleep(10);
        expect(div.innerHTML).toBe(
            `<div>Yes, <span name="name">Value</span>.</div>`,
        );
        await sleep(200);
        expect(div.innerHTML).toBe(
            `<div>Yes, <span name="name">NewValue</span>.</div>`,
        );
        (div.querySelector("[name]") as HTMLElement).click();
        await sleep(200);
        expect(div.innerHTML).toBe(
            `<div>Yes, <span name="name">PostMessage</span>.</div>`,
        );
    });
});
