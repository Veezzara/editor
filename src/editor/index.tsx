import { useEffect, useState } from "react";
import { ListBlock } from "./blocks/list";
import { RichTextDocument } from "./base/document";
import { IDocumentBlock } from "./base/block";
import { ParagraphBlock } from "./blocks/paragraph";
import { CounterBlock } from "./blocks/counter/model";

export const Editor = () => {
  const [root] = useState<IDocumentBlock>(() => new RichTextDocument());

  useEffect(() => {
    const paragraphBlock = new ParagraphBlock();
    const ulBlock = new ListBlock("ul");
    const olBlock = new ListBlock("ol");

    root.addChild(paragraphBlock);
    root.addChild(ulBlock);
    root.addChild(olBlock);
  }, [root]);

  const addParagraph = () => {
    const paragraphBlock = new ParagraphBlock();
    root.addChild(paragraphBlock);
  };

  const incrementFirstCounter = (rootBlock: IDocumentBlock): boolean => {
    for (const block of rootBlock) {
      if (block instanceof CounterBlock) {
        block.increment();
        return true;
      }

      if (incrementFirstCounter(block)) {
        return true;
      }
    }
    return false;
  };

  const DocumentRootComponent = root.getComponent();

  return (
    <>
      <button onClick={addParagraph}>Add paragraph</button>
      <button onClick={() => incrementFirstCounter(root)}>
        Increment first counter
      </button>
      <DocumentRootComponent />
    </>
  );
};
