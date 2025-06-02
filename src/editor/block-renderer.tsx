import { IDocumentBlock } from "./base/block";

export type EditorContentsProps = {
  block: IDocumentBlock;
};

export const BlockRenderer = ({ block }: EditorContentsProps) => {
  const Element = block.getElement();
  const Wrapper = block.getWrapper();

  return (
    <Wrapper>
      <Element {...block.getProps()}>
        {Array.from(block).map((child) => (
          <BlockRenderer block={child} key={child.getId()} />
        ))}
      </Element>
    </Wrapper>
  );
};
