import { InternalComponentProps } from "../../../base/block";
import { ListItemBlockComponentProps } from "../model";

export const ListItemBlockComponent = ({
  children,
}: InternalComponentProps<ListItemBlockComponentProps>) => <li>{children}</li>;
