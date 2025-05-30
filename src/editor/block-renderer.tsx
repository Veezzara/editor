import { IDocumentBlock } from "./base/block";

export type EditorContentsProps = {
  block: IDocumentBlock;
};

export const BlockRenderer = ({ block }: EditorContentsProps) => {
  const Element = block.getElement();

  return (
    <span contentEditable suppressContentEditableWarning>
      <Element {...block.getProps()}>
        {Array.from(block).map((child) => (
          <BlockRenderer block={child} key={child.getId()} />
        ))}
      </Element>
    </span>
  );
};
