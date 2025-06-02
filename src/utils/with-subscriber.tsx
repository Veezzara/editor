import { useSyncExternalStore } from "react";
import { Action, InternalComponent } from "../editor/base/block";

export type WithSubscriberProps<TComponentState> = {
  Component: InternalComponent<TComponentState>;
  subscribe: (action: Action) => Action;
  getSnapshot: () => TComponentState;
  setState: (state: TComponentState) => void;
};

export const WithSubscriber = <TComponentState,>({
  Component,
  subscribe,
  getSnapshot,
  setState,
}: WithSubscriberProps<TComponentState>) => {
  const WrappedComponent = () => {
    const stateSnapshot = useSyncExternalStore(subscribe, getSnapshot);
    return <Component state={stateSnapshot} setState={setState} />;
  };

  return WrappedComponent;
};
