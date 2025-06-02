import { DocumentBlock, InternalComponent } from "../../../base/block";
import { TextBlock } from "../../text/model";
import { CounterBlock } from "../../counter/model";
import { ParagraphBlockComponent } from "../ui";

export type ParagraphBlockComponentProps = object;

export class ParagraphBlock extends DocumentBlock<ParagraphBlockComponentProps> {
  type = "paragraph";

  override afterSetParent() {
    const textBlock = new TextBlock("Some text");
    this.addChild(textBlock);
    const counterBlock = new CounterBlock();
    this.addChild(counterBlock);
    const textBlock2 = new TextBlock("Some text 2");
    this.addChild(textBlock2);
  }

  protected getInternalComponent(): InternalComponent<ParagraphBlockComponentProps> {
    return ParagraphBlockComponent;
  }

  protected getSnapshot(): ParagraphBlockComponentProps {
    return {};
  }
  
  protected setState(_state: ParagraphBlockComponentProps): void {}

  override isComposite(): boolean {
    return true;
  }
}
