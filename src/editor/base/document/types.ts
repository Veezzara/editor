import { IDocumentBlock } from "../block/types";

export interface IDocumentRoot extends IDocumentBlock {
  getBlock(id: string): IDocumentBlock | null;
  addBlockToDocument(block: IDocumentBlock): void;
  removeBlockFromDocument(block: IDocumentBlock): void;
} 