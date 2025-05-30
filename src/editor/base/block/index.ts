import { ComponentClass, FunctionComponent } from "react";
import { generateUuid } from "../../../utils/generate-uuid";
import { ComponentProps, IDocumentBlock } from "./types";
import { IDocumentRoot } from "../document";

export abstract class DocumentBlock<TProps = ComponentProps>
  implements IDocumentBlock<TProps>
{
  abstract type: string;
  protected id = generateUuid();
  protected root: IDocumentRoot | null = null;
  protected parent: DocumentBlock | null = null;
  private children: string[] = [];

  getId(): string {
    return this.id;
  }

  afterSetRoot() {}

  setRoot(root: IDocumentRoot) {
    this.root = root;
    this.afterSetRoot();
  }

  getRoot(): IDocumentRoot {
    if (!this.root) {
      throw new Error("Block is not attached to a document.");
    }

    return this.root;
  }

  afterSetParent() {}

  setParent(parent: DocumentBlock): void {
    this.parent = parent;
    this.afterSetParent();
  }

  getParent(): DocumentBlock | null {
    return this.parent;
  }

  getType(): string {
    return this.type;
  }

  abstract getElement():
    | FunctionComponent<TProps>
    | ComponentClass<TProps>
    | string;

  abstract getProps(): TProps;

  isComposite(): boolean {
    return false;
  }

  private throwIfNotComposite() {
    if (!this.isComposite()) {
      throw new Error("Block is not composite.");
    }
  }

  getChildren(): string[] {
    return this.children;
  }

  addChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    this.children.push(child.getId());
    this.getRoot().addBlockToDocument(child);
    child.setRoot(this.getRoot());
    child.setParent(this);
  }

  removeChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    this.children = this.children.filter((id) => id !== child.getId());
    this.getRoot().removeBlockFromDocument(child);
  }

  *getIterator(): Generator<IDocumentBlock<TProps>> {
    if (!this.isComposite()) {
      return;
    }

    const children = this.getChildren();

    for (const child of children) {
      const block = this.getRoot().getBlock(child);

      if (!block) {
        continue;
      }

      yield block;
    }
  }

  [Symbol.iterator](): Generator<IDocumentBlock<TProps>> {
    return this.getIterator();
  }
}

export * from "./types";
