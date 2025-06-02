import { generateUuid } from "../../../utils/generate-uuid";
import {
  Action,
  Component,
  IDocumentBlock,
  InternalComponent,
  Wrapper,
} from "./types";
import { IDocumentRoot } from "../document";
import { BlockWrapper } from "./wrapper";
import { WithSubscriber } from "../../../utils/with-subscriber";

export abstract class DocumentBlock<TState> implements IDocumentBlock {
  abstract type: string;
  protected id = generateUuid();
  protected root: IDocumentRoot | null = null;
  protected parent: IDocumentBlock | null = null;
  private children: string[] = [];
  private observers: Action[] = [];

  getId(): string {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  afterSetRoot() {}

  setRoot(root: IDocumentRoot) {
    if (this.root) {
      this.root.removeBlockFromDocument(this);
    }

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

  setParent(parent: IDocumentBlock): void {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = parent;
    this.afterSetParent();
  }

  getParent(): IDocumentBlock | null {
    return this.parent;
  }

  getWrapper(): Wrapper {
    return BlockWrapper;
  }

  protected abstract getInternalComponent(): InternalComponent<TState>;

  getComponent(): Component {
    return this.Component;
  }

  protected abstract getSnapshot(): TState;

  protected abstract setState(state: TState): void;

  private setStateInternal(state: TState) {
    this.setState(state);
    this.notify();
  }

  private subscribe(action: Action) {
    this.observers.push(action);

    return () => {
      this.observers = this.observers.filter((observer) => observer !== action);
    };
  }

  private Component = WithSubscriber<TState>({
    Component: this.getInternalComponent(),
    subscribe: (action) => this.subscribe(action),
    getSnapshot: () => this.getSnapshot(),
    setState: (state) => this.setStateInternal(state),
  });

  private notify() {
    this.observers.forEach((observer) => observer());
  }

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

  *getIterator(): Generator<IDocumentBlock> {
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

  [Symbol.iterator](): Generator<IDocumentBlock> {
    return this.getIterator();
  }
}

export * from "./types";
