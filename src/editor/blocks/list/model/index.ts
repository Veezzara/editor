import { PropsWithChildren } from "react";
import { DocumentBlock, InternalComponent } from "../../../base/block";
import { ListBlockComponent } from "../ui";
import { ListItemBlock } from "../../list-item/model";

export type ListBlockComponentProps = {
  type: "ol" | "ul";
} & PropsWithChildren;

export class ListBlock extends DocumentBlock<ListBlockComponentProps> {
  type = "list";
  listType: "ol" | "ul";

  constructor(type: "ol" | "ul") {
    super();
    this.listType = type;
  }

  protected getInternalComponent(): InternalComponent<ListBlockComponentProps> {
    return ListBlockComponent;
  }

  protected getSnapshot(): ListBlockComponentProps {
    return {
      type: this.listType,
    };
  }

  protected setState(state: ListBlockComponentProps): void {
    this.listType = state.type;
  }

  override afterSetParent() {
    const listItemBlock = new ListItemBlock();
    this.addChild(listItemBlock);
  }

  override isComposite(): boolean {
    return true;
  }
}
