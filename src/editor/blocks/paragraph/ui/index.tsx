import { InternalComponentProps } from "../../../common/types/component";
import { ParagraphBlockComponentProps } from "../model";

export const ParagraphBlockComponent = ({
  children,
}: InternalComponentProps<ParagraphBlockComponentProps>) => <p>{children}</p>;
