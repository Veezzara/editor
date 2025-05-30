import { DocumentBlock } from "../../../base/block";
import { TextBlockComponent } from "../ui";

export type TextBlockComponentProps = {
  text: string;
};

export class TextBlock extends DocumentBlock<TextBlockComponentProps> {
  type = "text";
  text: string;

  constructor(
    text: string,
  ) {
    super();
    this.text = text;
  }

  override getElement() {
    return TextBlockComponent;
  }

  override getProps() {
    return {
      text: this.text,
    };
  }
}
