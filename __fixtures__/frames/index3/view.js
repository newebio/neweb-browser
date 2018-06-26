"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_components_1 = require("neweb-components");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class IndexView extends neweb_components_1.Component {
    beforeMount() {
        this.addElement("name", new neweb_components_1.HtmlComponent({
            innerHTML: rxjs_1.merge(rxjs_1.of(this.props.data.name), this.props.controller.onMessage),
            events: {
                click: () => this.props.controller.postMessage.next("PostMessage"),
            },
        }));
        this.addElement("end", new neweb_components_1.TextNode({
            value: this.props.params.pipe(operators_1.map((v) => v.end)),
        }));
    }
    getTemplate() {
        return `Yes, <span name="name"></span><span name="end"></span>`;
    }
}
exports.IndexView = IndexView;
exports.default = IndexView;
