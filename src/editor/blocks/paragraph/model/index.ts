import { TextNodeBlock } from "../../text-node/model";
import { CounterBlock } from "../../counter/model";
import { ParagraphBlockComponent } from "../ui";
import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";

export type ParagraphBlockComponentProps = undefined;

export class ParagraphBlock extends DocumentBlock<ParagraphBlockComponentProps> {
  type = "paragraph";

  override afterSetParent() {
    const textBlock = new TextNodeBlock("Some text");
    this.addChild(textBlock);
    const counterBlock = new CounterBlock();
    this.addChild(counterBlock);
    const textBlock2 = new TextNodeBlock("Some text 2");
    this.addChild(textBlock2);
  }

  protected getInitialState(): ParagraphBlockComponentProps {
    return undefined;
  }

  protected getInternalComponent(): InternalComponent<ParagraphBlockComponentProps> {
    return ParagraphBlockComponent;
  }

  override isComposite(): boolean {
    return true;
  }
}
