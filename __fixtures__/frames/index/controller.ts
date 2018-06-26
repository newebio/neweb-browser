import { BaseController } from "neweb-core";

export class IndexController extends BaseController<{ end: string }> {
    init() {
        return {
            name: "Neweb",
        };
    }
}
export default IndexController;
