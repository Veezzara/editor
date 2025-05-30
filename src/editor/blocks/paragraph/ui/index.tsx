import { ParagraphBlockComponentProps } from "../model";

export const ParagraphBlockComponent = ({
  children,
}: ParagraphBlockComponentProps) => {
  return <p>{children}</p>;
};
