import { PropsWithChildren } from "react";
import { DocumentBlock } from "../../../base/block";
import { ListBlockComponent } from "../ui";
import { ListItemBlock } from "../../list-item/model";

export type ListBlockComponentProps = {
  type: "ol" | "ul";
} & PropsWithChildren;

export class ListBlock extends DocumentBlock<ListBlockComponentProps> {
  type: "ol" | "ul";

  constructor(type: "ol" | "ul") {
    super();
    this.type = type;
  }

  override afterSetParent() {
    const listItemBlock = new ListItemBlock();
    this.addChild(listItemBlock);
  }

  override getElement() {
    return ListBlockComponent;
  }

  override getProps() {
    return {
      type: this.type,
    };
  }

  override isComposite(): boolean {
    return true;
  }
}
