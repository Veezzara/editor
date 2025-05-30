import { ListBlockComponentProps } from "../model";

export const ListBlockComponent = ({
  type,
  children,
}: ListBlockComponentProps) => {
  const ListElement = type;

  return <ListElement>{children}</ListElement>;
};
