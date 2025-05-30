import { TextBlockComponentProps } from "../model";

export const TextBlockComponent = ({ text }: TextBlockComponentProps) => {
  return (
    <span contentEditable={true} suppressContentEditableWarning data-text="true">
      {text}
    </span>
  );
};
