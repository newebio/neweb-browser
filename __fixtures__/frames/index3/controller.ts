import { BaseController } from "neweb-core";

export class Index3Controller extends BaseController<{ end: string }> {
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
export default Index3Controller;
