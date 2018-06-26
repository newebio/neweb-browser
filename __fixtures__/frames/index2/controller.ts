import { BaseController } from "neweb-core";

export class Index2Controller extends BaseController<{ end: string }> {
    init() {
        return {
            name: "Page",
        };
    }
}
export default Index2Controller;
