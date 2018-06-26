"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_components_1 = require("neweb-components");
const operators_1 = require("rxjs/operators");
class IndexView extends neweb_components_1.Component {
    beforeMount() {
        this.addElement("name", new neweb_components_1.TextNode({
            value: this.props.data.name,
        }));
        this.addElement("end", new neweb_components_1.TextNode({
            value: this.props.params.pipe(operators_1.map((v) => v.end)),
        }));
    }
    getTemplate() {
        return `Bye, <span name="name"></span><span name="end"></span>`;
    }
}
exports.IndexView = IndexView;
exports.default = IndexView;
