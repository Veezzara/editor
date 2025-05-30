import { useEffect, useState } from "react";
import { ListBlock } from "./blocks/list";
import { BlockRenderer } from "./block-renderer";
import { IDocumentRoot } from "./base/document";
import { RichTextDocument } from "./base/document";
import { useForceRender } from "../utils/use-force-render";
import { ParagraphBlock } from "./blocks/paragraph";

export const Editor = () => {
  const [root] = useState<IDocumentRoot>(() => new RichTextDocument());
  const forceRender = useForceRender();

  useEffect(() => {
    const paragraphBlock = new ParagraphBlock();
    const ulBlock = new ListBlock("ul");
    const olBlock = new ListBlock("ol");

    root.addChild(paragraphBlock);
    root.addChild(ulBlock);
    root.addChild(olBlock);

    forceRender();
  }, [forceRender, root]);

  const addParagraph = () => {
    const paragraphBlock = new ParagraphBlock();
    root.addChild(paragraphBlock);
    forceRender();
  };

  return (
    <>
      <button onClick={addParagraph}>Add paragraph</button>
      <BlockRenderer block={root} />
    </>
  );
};
