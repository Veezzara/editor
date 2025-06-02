import { ComponentClass, FunctionComponent, PropsWithChildren } from "react";
import { IDocumentRoot } from "../document";

export type Action = () => void;

export type InternalComponentProps<TState> = {
  state: TState;
  setState: (state: TState) => void;
} & PropsWithChildren;

export type ReactComponent<TComponentProps> =
  | FunctionComponent<TComponentProps>
  | ComponentClass<TComponentProps>;

export type InternalComponent<TState> = ReactComponent<InternalComponentProps<TState>>;

export type Component = ReactComponent<PropsWithChildren>;

export type Wrapper = ReactComponent<PropsWithChildren>;

export interface Iterable<T> {
  [Symbol.iterator](): Generator<T>;
  getIterator(): Generator<T>;
}

export interface IDocumentBlock extends Iterable<IDocumentBlock> {
  getId(): string;
  getType(): string;
  setRoot(root: IDocumentRoot): void;
  getRoot(): IDocumentRoot;
  setParent(parent: IDocumentBlock): void;
  getParent(): IDocumentBlock | null;
  getWrapper(): Wrapper;
  getComponent(): Component;
  isComposite(): boolean;
  getChildren(): string[];
  addChild(child: IDocumentBlock): void;
  removeChild(child: IDocumentBlock): void;
}
