import { DocumentBlock } from "../../../base/block";
import { CounterBlockComponent } from "../ui";

export class CounterBlock extends DocumentBlock {
  type = "counter";

  override getElement() {
    return CounterBlockComponent;
  }

  override getProps() {
    return {};
  }
}