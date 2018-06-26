import { Component, TextNode } from "neweb-components";
import { IViewProps } from "neweb-core";
import { map } from "rxjs/operators";

export class IndexView extends Component<
    IViewProps<{ end: string }, { name: string }, {}, {}>
> {
    beforeMount() {
        this.addElement(
            "name",
            new TextNode({
                value: this.props.data.name,
            }),
        );
        this.addElement(
            "end",
            new TextNode({
                value: this.props.params.pipe(map((v) => v.end)),
            }),
        );
    }
    getTemplate() {
        return `Hello, <span name="name"></span><span name="end"></span>`;
    }
}
export default IndexView;
