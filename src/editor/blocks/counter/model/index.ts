import { DocumentBlock } from "../../../base/block";
import { InternalComponent } from "../../../common/types/component";
import { CounterBlockComponent } from "../ui";

export type CounterBlockState = {
  count: number;
};

export class CounterBlock extends DocumentBlock<CounterBlockState> {
  type = "counter";

  protected getInitialState(): CounterBlockState {
    return {
      count: 0,
    };
  }

  protected getInternalComponent(): InternalComponent<CounterBlockState> {
    return CounterBlockComponent;
  }

  public increment() {
    this.setState({
      count: this.getInternalState().state.count + 1,
    });
  }
}
