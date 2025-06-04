import { InternalComponent } from "../../common/types/component";
import { DocumentBlock, IDocumentBlock } from "../block";
import { IDocumentRoot } from "./types";
import { RichTextDocumentComponent } from "./ui";

export type RichTextDocumentState = undefined;

export class RichTextDocument
  extends DocumentBlock<RichTextDocumentState>
  implements IDocumentRoot
{
  type = "document";
  private blocks: Map<string, IDocumentBlock> = new Map();

  constructor() {
    super();
    this.root = this;
  }

  protected getInitialState() {
    return undefined;
  }

  override setRoot(_root: IDocumentRoot): void {
    throw new Error("Cannot attach Document to another root.");
  }

  protected getInternalComponent(): InternalComponent<RichTextDocumentState> {
    return RichTextDocumentComponent;
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
