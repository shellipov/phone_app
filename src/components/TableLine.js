import React from "react";
import { Text, View, StyleSheet } from "react-native";

function TableLine({ el, index }) {
  return (
    <View style={styles.tableHeader} keys={el.ticker}>
      <Text style={styles.tableCellFont}>{el.ticker}</Text>
      <Text style={styles.tableCellFont}>{el.last}</Text>
      <Text style={styles.tableCellFont}>{el.highestBid}</Text>
      <Text style={styles.tableCellFont}>{el.percentChange}</Text>
    </View>
  );
}

export default TableLine;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "black",
  },
  tableCellFont: {
    fontSize: 9,
    flex: 1,
    margin: 2,
  },
});
