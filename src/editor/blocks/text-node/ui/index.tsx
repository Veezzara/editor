import { InternalComponentProps } from "../../../common/types/component";
import { TextNodeBlockComponentProps } from "../model";

export const TextNodeBlockComponent = ({
  state,
}: InternalComponentProps<TextNodeBlockComponentProps>) => (
  <span
    contentEditable={true}
    suppressContentEditableWarning
    data-text="true"
  >
    {state.text}
  </span>
);
