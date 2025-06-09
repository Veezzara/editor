import { IDocumentBlock } from "./types";
import { IDocumentRoot } from "../document";
import { BlockWrapper } from "./wrapper";
import { Action } from "../../common/types/action";
import { generateUuid } from "../../common/utils/generate-uuid";
import { WithSubscriber } from "../../common/utils/with-subscriber";
import { Observable } from "../../common/utils/observable";
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
  private stateObservable: Observable<InternalState<TState>>;

  constructor() {
    const initialState = this.getInitialState();
    this.stateObservable = new Observable<InternalState<TState>>({
      state: initialState,
      children: [],
    });
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
    return this.stateObservable.getValue();
  }

  protected setState(state: TState): void {
    const currentState = this.stateObservable.getValue();
    this.stateObservable.setValue({
      ...currentState,
      state,
    });
  }

  private subscribe(action: Action) {
    return this.stateObservable.subscribe(action);
  }

  private Component = WithSubscriber<TState>({
    Component: this.getInternalComponent(),
    subscribe: (action) => this.subscribe(action),
    getSnapshot: () => this.getInternalState(),
    setState: (state) => this.setState(state),
    block: this,
  });

  isComposite(): boolean {
    return false;
  }

  private throwIfNotComposite() {
    if (!this.isComposite()) {
      throw new Error("Block is not composite.");
    }
  }

  getChildren(): string[] {
    return this.stateObservable.getValue().children;
  }

  addChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    const currentState = this.stateObservable.getValue();
    const children = [...currentState.children, child.getId()];
    
    this.stateObservable.setValue({
      ...currentState,
      children,
    });

    this.getRoot().addBlockToDocument(child);
    child.setRoot(this.getRoot());
    child.setParent(this);
  }

  removeChild(child: IDocumentBlock): void {
    this.throwIfNotComposite();

    const currentState = this.stateObservable.getValue();
    const children = currentState.children.filter(
      (id) => id !== child.getId()
    );
    
    this.stateObservable.setValue({
      ...currentState,
      children,
    });

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
