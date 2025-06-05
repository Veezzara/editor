import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";
import { TextNodeBlockComponent } from "../ui";

export type TextNodeBlockComponentProps = {
  text: string;
};

export class TextNodeBlock extends DocumentBlock<TextNodeBlockComponentProps> {
  type = "text";

  constructor(text: string) {
    super();
    this.setState({ text });
  }

  protected getInitialState(): TextNodeBlockComponentProps {
    return {
      text: "",
    };
  }

  protected getInternalComponent(): InternalComponent<TextNodeBlockComponentProps> {
    return TextNodeBlockComponent;
  }
}
