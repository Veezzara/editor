import { PropsWithChildren } from "react";
import { DocumentBlock } from "../../../base/block";
import { ListItemBlockComponent } from "../ui";
import { ParagraphBlock } from "../../paragraph/model";

export type ListItemBlockComponentProps = PropsWithChildren;

export class ListItemBlock extends DocumentBlock<ListItemBlockComponentProps> {
  type = "li";

  override isComposite(): boolean {
    return true;
  }

  override afterSetParent() {
    const paragraphBlock = new ParagraphBlock();
    this.addChild(paragraphBlock);
  }

  override getElement() {
    return ListItemBlockComponent;
  }

  override getProps() {
    return {};
  }
}
