import { IDocumentBlock } from "./types";
import { IDocumentRoot } from "../document";
import { BlockWrapper } from "./wrapper";
import { Action } from "../../common/types/action";
import { generateUuid } from "../../common/utils/generate-uuid";
import { WithSubscriber } from "../../common/utils/with-subscriber";
import {
  Wrapper,
  InternalComponent,
  Component,
  InternalState,
} from "../../common/types/component";

export abstract class DocumentBlock<TState> implements IDocumentBlock {
  abstract type: string;
  protected id = generateUuid();
  protected root: IDocumentRoot | null = null;
  protected parent: IDocumentBlock | null = null;
  protected internalState: InternalState<TState>;
  private observers: Action[] = [];

  constructor() {
    const initialState = this.getInitialState();
    this.internalState = {
      state: initialState,
      children: [],
    };
  }

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

  protected abstract getInitialState(): TState;

  protected getInternalState(): InternalState<TState> {
    return this.internalState;
  }

  protected setState(state: TState): void {
    this.internalState = {
      ...this.internalState,
      state,
    };
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
    getSnapshot: () => this.getInternalState(),
    setState: (state) => this.setState(state),
    block: this,
  });

  private notify() {
    for (const observer of this.observers) {
      observer();
    }
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
    return this.internalState.children;
  }

  addChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    const children = [...this.internalState.children, child.getId()];
    this.internalState = {
      ...this.internalState,
      children,
    };

    this.getRoot().addBlockToDocument(child);
    child.setRoot(this.getRoot());
    child.setParent(this);

    this.notify();
  }

  removeChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    const children = this.internalState.children.filter(
      (id) => id !== child.getId()
    );
    this.internalState = {
      ...this.internalState,
      children,
    };

    this.getRoot().removeBlockFromDocument(child);

    this.notify();
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
