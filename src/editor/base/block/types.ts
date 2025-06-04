import { Component, Wrapper } from "../../common/types/component";
import { IDocumentRoot } from "../document";

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
