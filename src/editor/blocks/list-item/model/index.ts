import { DocumentBlock, InternalComponent } from "../../../base/block";
import { ListItemBlockComponent } from "../ui";
import { ParagraphBlock } from "../../paragraph/model";

export type ListItemBlockComponentProps = object;

export class ListItemBlock extends DocumentBlock<ListItemBlockComponentProps> {
  type = "li";

  override isComposite(): boolean {
    return true;
  }

  override afterSetParent() {
    const paragraphBlock = new ParagraphBlock();
    this.addChild(paragraphBlock);
  }

  protected getInternalComponent(): InternalComponent<ListItemBlockComponentProps> {
    return ListItemBlockComponent;
  }

  protected getSnapshot(): ListItemBlockComponentProps {
    return {};
  }

  protected setState(_state: ListItemBlockComponentProps): void {}
}
