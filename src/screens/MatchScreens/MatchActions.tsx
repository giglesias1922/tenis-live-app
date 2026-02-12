import React from "react";
import { View, StyleSheet, Vibration } from "react-native";
import { Text, Button } from "react-native-paper";

export default function MatchActions() {

  const onAction = (type: string) => {
    Vibration.vibrate(20);
    console.log("Acción:", type);
  };

  return (
    <View style={styles.container}>

      {/* IZQUIERDA */}
      <View style={styles.column}>

        <View style={styles.section}>
          <Text style={styles.title}>SERVICIO</Text>
          <View style={styles.grid}>
            <Button mode="contained" style={styles.greenBtn} onPress={() => onAction("FIRST_SERVE_IN")}>1st IN</Button>
            <Button mode="contained" style={styles.orangeBtn} onPress={() => onAction("FIRST_SERVE_OUT")}>1st OUT</Button>
            <Button mode="contained" style={styles.winnerBtn} onPress={() => onAction("ACE")}>ACE</Button>
            <Button mode="contained" style={styles.redBtn} onPress={() => onAction("DOUBLE_FAULT")}>DOUBLE</Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>WINNERS</Text>
          <View style={styles.grid}>
            <Button mode="contained" style={styles.winnerBtn} onPress={() => onAction("FH_WINNER")}>DRIVE</Button>
            <Button mode="contained" style={styles.winnerBtn} onPress={() => onAction("BH_WINNER")}>REVES</Button>
          </View>
        </View>

      </View>

      {/* DERECHA */}
      <View style={styles.column}>

        <View style={styles.section}>
          <Text style={styles.title}>ERRORES</Text>
          <View style={styles.grid}>
            <Button mode="contained" style={styles.redBtn} onPress={() => onAction("UNFORCED_FH_ERROR")}>U DRIVE</Button>
            <Button mode="contained" style={styles.redBtn} onPress={() => onAction("UNFORCED_BH_ERROR")}>U REVES</Button>
            <Button mode="contained" style={styles.orangeBtn} onPress={() => onAction("FORCED_FH_ERROR")}>F DRIVE</Button>
            <Button mode="contained" style={styles.orangeBtn} onPress={() => onAction("FORCED_BH_ERROR")}>F REVES</Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>BREAK POINT</Text>
          <View style={styles.grid}>
            <Button mode="contained" style={styles.greenBtn} onPress={() => onAction("BREAK_POINT_WON")}>WON</Button>
            <Button mode="contained" style={styles.redBtn} onPress={() => onAction("BREAK_POINT_LOST")}>LOST</Button>
          </View>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },

  column: {
    flex: 1,
  },

  section: {
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  grid: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  greenBtn: {
    backgroundColor: "green",
    width: "90%",
    height: 55,
    marginBottom: 10,
  },

  redBtn: {
    backgroundColor: "#c62828",
    width: "90%",
    height: 55,
    marginBottom: 10,
  },

  orangeBtn: {
    backgroundColor: "#ffa500",
    width: "90%",
    height: 55,
    marginBottom: 10,
  },

  winnerBtn: {
    backgroundColor: "#4f94d4",
    width: "90%",
    height: 55,
    marginBottom: 10,
  },

});
