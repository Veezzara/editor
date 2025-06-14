import { InternalComponentProps } from "../../../common/types/component";
import { ListBlockComponentProps } from "../model";

export const ListBlockComponent = ({
  state,
  children,
}: InternalComponentProps<ListBlockComponentProps>) => {
  const ListElement = state.type;
  return <ListElement>{children}</ListElement>;
};
