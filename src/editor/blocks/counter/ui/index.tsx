import styles from "./style.module.scss";
import { InternalComponentProps } from "../../../base/block";
import { CounterBlockState } from "../model";

export const CounterBlockComponent = ({
  state,
  setState,
}: InternalComponentProps<CounterBlockState>) => (
  <span contentEditable={false} className={styles.counter}>
    <span>{state.count}</span>
    <button onClick={() => setState({ count: state.count + 1 })}>+</button>
  </span>
);
