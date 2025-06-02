import { DocumentBlock, InternalComponent } from "../../../base/block";
import { CounterBlockComponent } from "../ui";

export type CounterBlockState = {
  count: number;
};

export class CounterBlock extends DocumentBlock<CounterBlockState> {
  type = "counter";
  private count = 0;

  protected getInternalComponent(): InternalComponent<CounterBlockState> {
    return CounterBlockComponent;
  }

  protected getSnapshot(): CounterBlockState {
    return {
      count: this.count,
    };
  }

  protected setState(state: CounterBlockState): void {
    this.count = state.count;
  }
}
