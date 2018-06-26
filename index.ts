import { render as renderNewebComponents } from "neweb-components";
import { NewebBrowser } from "./lib/NewebBrowser";

export function render(params: {
    root: HTMLElement | null;
    resolveModule: (path: string) => any;
    url?: string;
    history?: History;
}) {
    const root = params.root || document.getElementsByTagName("body")[0];
    new NewebBrowser({
        resolveModule: params.resolveModule,
        renderRootComponent: (component: any) => {
            renderNewebComponents(component, root);
        },
        replaceRootComponent: (component: any) => {
            root.innerHTML = "";
            renderNewebComponents(component, root);
        },
        history: params.history,
    }).start({ url: params.url || window.location.href });
}
