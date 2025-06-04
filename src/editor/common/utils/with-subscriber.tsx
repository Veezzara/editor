import { memo, useSyncExternalStore } from "react";
import { IDocumentBlock } from "../../base/block";
import { Action } from "../types/action";
import { InternalComponent, InternalState } from "../types/component";

export type WithSubscriberProps<TComponentState> = {
  Component: InternalComponent<TComponentState>;
  subscribe: (action: Action) => Action;
  getSnapshot: () => InternalState<TComponentState>;
  setState: (state: TComponentState) => void;
  block: IDocumentBlock;
};

export const WithSubscriber = <TComponentState,>({
  Component,
  subscribe,
  getSnapshot,
  setState,
  block,
}: WithSubscriberProps<TComponentState>) => {
  const WrappedComponent = () => {
    const stateSnapshot = useSyncExternalStore(subscribe, getSnapshot);
    const Wrapper = block.getWrapper();

    return (
      <Wrapper>
        <Component state={stateSnapshot.state} setState={setState}>
          {Array.from(block).map((child) => {
            const Component = child.getComponent();
            return <Component key={child.getId()} />;
          })}
        </Component>
      </Wrapper>
    );
  };

  return memo(WrappedComponent);
};
