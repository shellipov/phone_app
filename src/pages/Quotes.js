import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import TableLine from "../components/TableLine";
import Api from "../api/api";
import { fadeIn, fadeOut } from "../utils/fade";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const Quotes = observer(() => {
  const table = useRef(new Animated.Value(0)).current;

  async function getData() {

    const data = await Api.getData();

    const tickers = Object.keys(data).map((el) => ({
      ticker: el,
      last: data[el].last,
      highestBid: data[el].highestBid,
      percentChange: data[el].percentChange,
    }));

    store.setQuotes(tickers);
    
    fadeIn(table);
    setTimeout(() => {
      fadeOut(table);
      store.renew();
    }, 5000);
  }

  useEffect(() => {
    const ac = new AbortController();
    getData();
    return () => ac.abort();
  }, [store.renewCounter]);

  if (store.quotes.length) {
    return (
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderFont}>Ticker</Text>
          <Text style={styles.tableHeaderFont}>Last</Text>
          <Text style={styles.tableHeaderFont}>Highest Bid</Text>
          <Text style={styles.tableHeaderFont}>Percent Change</Text>
        </View>
        <Animated.View style={{ opacity: table }}>
          <ScrollView>
            {store.quotes.map((el, index) => (
              <TableLine key={el.ticker} el={el} index={index} />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    );
  } else {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" />
        </View>
      </>
    );
  }
});

export default Quotes;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "black",
  },
  tableHeaderFont: {
    backgroundColor: "green",
    color: 'white',
    fontSize: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 3
  },
});
