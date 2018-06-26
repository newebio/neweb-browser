import { Component, HtmlComponent, TextNode } from "neweb-components";
import { IViewProps } from "neweb-core";
import { merge, of } from "rxjs";
import { map } from "rxjs/operators";

export class IndexView extends Component<
    IViewProps<{ end: string }, { name: string }, string, string>
> {
    beforeMount() {
        this.addElement(
            "name",
            new HtmlComponent({
                innerHTML: merge(
                    of(this.props.data.name),
                    this.props.controller.onMessage,
                ),
                events: {
                    click: () =>
                        this.props.controller.postMessage.next("PostMessage"),
                },
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
        return `Yes, <span name="name"></span><span name="end"></span>`;
    }
}
export default IndexView;
