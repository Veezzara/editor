import { InternalComponentProps } from "../../../base/block";
import { ParagraphBlockComponentProps } from "../model";

export const ParagraphBlockComponent = ({
  children,
}: InternalComponentProps<ParagraphBlockComponentProps>) => <p>{children}</p>;
