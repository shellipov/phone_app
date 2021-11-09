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
import { fadeIn, fadeOut } from "../utils/fade";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const Quotes = observer(() => {
  const table = useRef(new Animated.Value(0)).current;

  async function getData() {
    store.getData();
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

  if (store.quotes) {
    return (
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderFont}>Ticker</Text>
          <Text style={styles.tableHeaderFont}>Last</Text>
          <Text style={styles.tableHeaderFont}>Highest Bid</Text>
          <Text style={styles.tableHeaderFont}>Percent Change</Text>
        </View>

        {store.error && <Text style={styles.errorCell}>{store.error}</Text>}

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
    color: "white",
    fontSize: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  errorCell: {
    width: "100%",
    color: "red",
    fontSize: 12,
    padding: 3,
    textAlign: "center",
  },
});
