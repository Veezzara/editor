import { ComponentClass, FunctionComponent } from "react";
import { IDocumentRoot } from "../document";

export type ComponentProps = any;

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
  getElement(): FunctionComponent<TProps> | ComponentClass<TProps> | string;
  getProps(): TProps;
  isComposite(): boolean;
  getChildren(): string[];
  addChild(child: IDocumentBlock): void;
  removeChild(child: IDocumentBlock): void;
}
