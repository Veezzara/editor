import { ComponentClass, FunctionComponent, PropsWithChildren } from "react";

export type InternalState<TState> = {
  state: TState;
  children: string[];
};

export type InternalComponentProps<TState> = {
  state: TState;
  setState: (state: TState) => void;
} & PropsWithChildren;

export type ReactComponent<TComponentProps> =
  | FunctionComponent<TComponentProps>
  | ComponentClass<TComponentProps>;

export type InternalComponent<TState> = ReactComponent<
  InternalComponentProps<TState>
>;

export type Component = ReactComponent<PropsWithChildren>;
export type Wrapper = ReactComponent<PropsWithChildren>;
