import { FunctionComponent, ComponentClass } from "react";
import { DocumentBlock, IDocumentBlock } from "../block";
import { IDocumentRoot } from "./types";

export class RichTextDocument extends DocumentBlock implements IDocumentRoot {
  type = "document";
  private blocks: Map<string, IDocumentBlock> = new Map();

  constructor() {
    super();
    this.root = this;
  }

  override setRoot(_root: IDocumentRoot): void {
    throw new Error("Cannot attach Document to another root.");
  }

  override getElement():
    | string
    | FunctionComponent<any>
    | ComponentClass<any, any> {
    return "div";
  }

  override getProps() {
    return {};
  }

  override isComposite(): boolean {
    return true;
  }

  getBlock(id: string): IDocumentBlock | null {
    return this.blocks.get(id) ?? null;
  }

  addBlockToDocument(block: IDocumentBlock): void {
    this.blocks.set(block.getId(), block);
  }

  removeBlockFromDocument(block: IDocumentBlock): void {
    this.blocks.delete(block.getId());
  }
}

export * from "./types";