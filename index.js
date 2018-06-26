"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_components_1 = require("neweb-components");
const NewebBrowser_1 = require("./lib/NewebBrowser");
function render(params) {
    const root = params.root || document.getElementsByTagName("body")[0];
    new NewebBrowser_1.NewebBrowser({
        resolveModule: params.resolveModule,
        renderRootComponent: (component) => {
            neweb_components_1.render(component, root);
        },
        replaceRootComponent: (component) => {
            root.innerHTML = "";
            neweb_components_1.render(component, root);
        },
        history: params.history,
    }).start({ url: params.url || window.location.href });
}
exports.render = render;
