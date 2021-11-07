import { makeAutoObservable } from "mobx";

class Store {
  quotes = [];
  renewCounter = 0;
  constructor() {
    makeAutoObservable(this);
  }

  setQuotes(quotes) {
    this.quotes = quotes;
  }
  renew() {
    this.renewCounter += 1;
  }
}

export default new Store();
