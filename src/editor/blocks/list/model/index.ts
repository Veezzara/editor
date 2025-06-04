import { PropsWithChildren } from "react";
import { ListBlockComponent } from "../ui";
import { ListItemBlock } from "../../list-item/model";
import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";

export type ListBlockComponentProps = {
  type: "ol" | "ul";
} & PropsWithChildren;

export class ListBlock extends DocumentBlock<ListBlockComponentProps> {
  type = "list";

  constructor(type: "ol" | "ul") {
    super();
    this.setState({ type });
  }

  protected getInitialState(): ListBlockComponentProps {
    return {
      type: "ul",
    };
  }

  protected getInternalComponent(): InternalComponent<ListBlockComponentProps> {
    return ListBlockComponent;
  }

  override afterSetParent() {
    const listItemBlock = new ListItemBlock();
    this.addChild(listItemBlock);
  }

  override isComposite(): boolean {
    return true;
  }
}
