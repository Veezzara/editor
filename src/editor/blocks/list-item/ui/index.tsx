import { ListItemBlockComponentProps } from "../model";

export const ListItemBlockComponent = ({
  children,
}: ListItemBlockComponentProps) => {
  return <li>{children}</li>;
};
