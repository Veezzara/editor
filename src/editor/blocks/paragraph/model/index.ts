import { PropsWithChildren } from "react";
import { DocumentBlock } from "../../../base/block";
import { ParagraphBlockComponent } from "../ui";
import { TextBlock } from "../../text/model";
import { CounterBlock } from "../../counter/model";

export type ParagraphBlockComponentProps = PropsWithChildren;

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

  override getProps() {
    return {};
  }

  override getElement() {
    return ParagraphBlockComponent;
  }

  override isComposite(): boolean {
    return true;
  }
}
