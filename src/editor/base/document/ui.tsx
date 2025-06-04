import { RichTextDocumentState } from ".";
import { InternalComponentProps } from "../../common/types/component";

export const RichTextDocumentComponent = ({
  children,
}: InternalComponentProps<RichTextDocumentState>) => (
  <div contentEditable suppressContentEditableWarning>
    {children}
  </div>
);
