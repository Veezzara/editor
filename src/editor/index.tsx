import { useEffect, useState } from "react";
import { ListBlock } from "./blocks/list";
import { RichTextDocument } from "./base/document";
import { IDocumentBlock } from "./base/block";
import { ParagraphBlock } from "./blocks/paragraph";

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

  const Document = root.getComponent();

  return (
    <>
      <button onClick={addParagraph}>Add paragraph</button>
      <Document />
    </>
  );
};
