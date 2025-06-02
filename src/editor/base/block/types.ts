import { ComponentClass, FunctionComponent, PropsWithChildren } from "react";
import { IDocumentRoot } from "../document";

export type ComponentProps = any;

export type Component<TProps = ComponentProps> =
  | FunctionComponent<TProps>
  | ComponentClass<TProps>
  | string;

export type Wrapper<TProps = ComponentProps> = Component<TProps & PropsWithChildren>;

export interface Iterable<T> {
  [Symbol.iterator](): Generator<T>;
  getIterator(): Generator<T>;
}

export interface IDocumentBlock<TProps = ComponentProps>
  extends Iterable<IDocumentBlock<TProps>> {
  getId(): string;
  getType(): string;
  setRoot(root: IDocumentRoot): void;
  getRoot(): IDocumentRoot;
  setParent(parent: IDocumentBlock): void;
  getParent(): IDocumentBlock | null;
  getWrapper(): Wrapper<TProps>;
  getElement(): Component<TProps>;
  getProps(): TProps;
  isComposite(): boolean;
  getChildren(): string[];
  addChild(child: IDocumentBlock): void;
  removeChild(child: IDocumentBlock): void;
}
