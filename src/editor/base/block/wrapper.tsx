import { Wrapper } from "./types";

export const BlockWrapper: Wrapper = ({ children }) => {
  return (
    <span contentEditable suppressContentEditableWarning>
      {children}
    </span>
  );
};
