import { DocumentBlock, InternalComponent } from "../../../base/block";
import { TextBlockComponent } from "../ui";

export type TextBlockComponentProps = {
  text: string;
};

export class TextBlock extends DocumentBlock<TextBlockComponentProps> {
  type = "text";
  text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  protected getInternalComponent(): InternalComponent<TextBlockComponentProps> {
    return TextBlockComponent;
  }

  protected getSnapshot(): TextBlockComponentProps {
    return {
      text: this.text,
    };
  }

  protected setState(state: TextBlockComponentProps): void {
    this.text = state.text;
  }
}
