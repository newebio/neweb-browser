import { render } from ".";

describe("render neweb components", () => {
    it("render", async () => {
        const div = document.createElement("div");
        render({
            root: div,
            resolveModule: (path) =>
                require(__dirname + "/__fixtures__/" + path),
            url: "/",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(div.innerHTML).toBe(`<div>Hello, Neweb!</div>`);
    });
});
