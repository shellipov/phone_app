import axios from "axios";

export default class Api {
  static async getData() {
    try {
      const resp = await axios.get(
        "https://poloniex.com/public?command=returnTicker"
      );
      return resp.data;
    } catch (error) {
      console.log({error});
      return({error});
    }
  }
}
