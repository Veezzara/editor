import { Action } from "../types/action";

export class Observable<T> {
  private observers: Action[] = [];

  constructor(private value: T) {}

  subscribe(observer: Action) {
    this.observers.push(observer);

    return () => {
      this.observers = this.observers.filter(
        (observer) => observer !== observer
      );
    };
  }

  getValue() {
    return this.value;
  }

  setValue(value: T) {
    if (this.value === value) {
      return;
    }

    this.value = value;
    this.notify();
  }

  notify() {
    for (const observer of this.observers) {
      observer();
    }
  }
}
