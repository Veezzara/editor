import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";
import { TextBlockComponent } from "../ui";

export type TextBlockComponentProps = {
  text: string;
};

export class TextBlock extends DocumentBlock<TextBlockComponentProps> {
  type = "text";

  constructor(text: string) {
    super();
    this.setState({ text });
  }

  protected getInitialState(): TextBlockComponentProps {
    return {
      text: "",
    };
  }

  protected getInternalComponent(): InternalComponent<TextBlockComponentProps> {
    return TextBlockComponent;
  }
}
