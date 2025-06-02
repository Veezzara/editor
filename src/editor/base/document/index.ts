import { DocumentBlock, IDocumentBlock, InternalComponent } from "../block";
import { IDocumentRoot } from "./types";
import { RichTextDocumentComponent } from "./ui";

export class RichTextDocument
  extends DocumentBlock<object>
  implements IDocumentRoot
{
  type = "document";
  private blocks: Map<string, IDocumentBlock> = new Map();

  constructor() {
    super();
    this.root = this;
  }

  override setRoot(_root: IDocumentRoot): void {
    throw new Error("Cannot attach Document to another root.");
  }

  protected getInternalComponent(): InternalComponent<object> {
    return RichTextDocumentComponent;
  }

  protected getSnapshot(): object {
    return {};
  }
  
  protected setState(_state: object): void {}

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
