import { InternalComponentProps } from "../../../common/types/component";
import { TextBlockComponentProps } from "../model";

export const TextBlockComponent = ({
  state,
}: InternalComponentProps<TextBlockComponentProps>) => (
  <span
    contentEditable={true}
    suppressContentEditableWarning
    data-text="true"
  >
    {state.text}
  </span>
);
