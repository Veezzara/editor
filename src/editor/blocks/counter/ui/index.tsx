import { useState } from "react";
import styles from "./style.module.scss";

export const CounterBlockComponent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <span contentEditable={false} className={styles.counter}>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </span>
  );
};
