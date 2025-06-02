import { IDocumentBlock } from "./base/block";

export type EditorContentsProps = {
  block: IDocumentBlock;
};

export const BlockRenderer = ({ block }: EditorContentsProps) => {
  const Wrapper = block.getWrapper();
  const Component = block.getComponent();

  return (
    <Wrapper>
      <Component>
        {Array.from(block).map((child) => (
          <BlockRenderer block={child} key={child.getId()} />
        ))}
      </Component>
    </Wrapper>
  );
};
