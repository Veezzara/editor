import { ListItemBlockComponent } from "../ui";
import { ParagraphBlock } from "../../paragraph/model";
import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";

export type ListItemBlockComponentProps = undefined;

export class ListItemBlock extends DocumentBlock<ListItemBlockComponentProps> {
  type = "li";

  override isComposite(): boolean {
    return true;
  }

  override afterSetParent() {
    const paragraphBlock = new ParagraphBlock();
    this.addChild(paragraphBlock);
  }

  protected getInitialState(): ListItemBlockComponentProps {
    return undefined;
  }

  protected getInternalComponent(): InternalComponent<ListItemBlockComponentProps> {
    return ListItemBlockComponent;
  }
}
