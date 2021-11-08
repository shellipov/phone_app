import { makeAutoObservable } from "mobx";

class Store {
  quotes = [];
  renewCounter = 0;
  error = 0;  
  constructor() {
    makeAutoObservable(this);
  }

  setQuotes(quotes) {
    this.quotes = quotes;
  }
  renew() {
    this.renewCounter += 1;
  }
  getData(){

  }
}

export default new Store();
