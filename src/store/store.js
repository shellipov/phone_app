import { makeAutoObservable } from "mobx";
import Api from "../api/api";

class Store {
  quotes = [];
  renewCounter = 0;
  error = null;
  constructor() {
    makeAutoObservable(this);
  }

  setQuotes(quotes) {
    this.quotes = quotes;
  }
  renew() {
    this.renewCounter += 1;
  }
  setError(err) {
    this.error = err;
  }

  async getData() {
    const data = await Api.getData();
    if (data.error) {
      this.setError(data.error.toString());
    } else {
      try {
        const tickers = Object.keys(data).map((el) => ({
          ticker: el,
          last: data[el].last,
          highestBid: data[el].highestBid,
          percentChange: data[el].percentChange,
        }));
        this.setQuotes(tickers);
        this.setError(null);
      } catch (err) {
        console.log(err);
        this.setError("Ошибка получения данных");
        this.setQuotes([]);
      }
    }
  }
}

export default new Store();
