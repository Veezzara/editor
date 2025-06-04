import { InternalComponentProps } from "../../../common/types/component";
import { ListItemBlockComponentProps } from "../model";

export const ListItemBlockComponent = ({
  children,
}: InternalComponentProps<ListItemBlockComponentProps>) => <li>{children}</li>;
