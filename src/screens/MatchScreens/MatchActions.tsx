import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";

export default function MatchActions() {
  const onAction = (type: string) => {
    console.log("Acción:", type);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>  
      

      {/* SERVICIO */}
      <Card style={styles.card}>
        <Card.Title title="Servicio" />
        <Card.Content>
          <View style={styles.grid}>
            <Button mode="contained" onPress={() => onAction("FIRST_SERVE_IN")} style={styles.greenBtn}>1st IN</Button>
            <Button mode="contained" onPress={() => onAction("FIRST_SERVE_OUT")} style={styles.redBtn}>1st OUT</Button>
            <Button mode="contained" onPress={() => onAction("ACE")} style={styles.greenBtn}>ACE</Button>
            <Button mode="contained" onPress={() => onAction("DOUBLE_FAULT")} style={styles.redBtn}>DOUBLE</Button>
          </View>
        </Card.Content>
      </Card>

      {/* WINNERS */}
      <Card style={styles.card}>
        <Card.Title title="Winners" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => onAction("FH_WINNER")}
            style={styles.fullBtn}
          >
            FH WINNER
          </Button>

          <Button
            mode="contained"
            onPress={() => onAction("BH_WINNER")}
            style={styles.fullBtn}
          >
            BH WINNER
          </Button>
        </Card.Content>
      </Card>

      {/* ERRORES */}
      <Card style={styles.card}>
        <Card.Title title="Errores" />
        <Card.Content>
          <View style={styles.grid}>
            <Button mode="contained" onPress={() => onAction("UNFORCED_FH_ERROR")} style={styles.redBtn}>U FH</Button>
            <Button mode="contained" onPress={() => onAction("UNFORCED_BH_ERROR")} style={styles.redBtn}>U BH</Button>
            <Button mode="contained" onPress={() => onAction("FORCED_FH_ERROR")} style={styles.orangeBtn}>F FH</Button>
            <Button mode="contained" onPress={() => onAction("FORCED_BH_ERROR")} style={styles.orangeBtn}>F BH</Button>
          </View>
        </Card.Content>
      </Card>

      {/* BREAK POINT */}
      <Card style={styles.card}>
        <Card.Title title="Break Point" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => onAction("BREAK_POINT_WON")}
            style={styles.greenBtn}
          >
            BP WON
          </Button>

          <Button
            mode="contained"
            onPress={() => onAction("BREAK_POINT_LOST")}
            style={styles.redBtn}
          >
            BP LOST
          </Button>
        </Card.Content>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  fullBtn: {
    marginBottom: 10,
    height: 55,
  },
  greenBtn: {
    backgroundColor: "#2e7d32",
    flexBasis: "48%",
    marginBottom: 10,
    height: 55,
  },
  redBtn: {
    backgroundColor: "#c62828",
    flexBasis: "48%",
    marginBottom: 10,
    height: 55,
  },
  orangeBtn: {
    backgroundColor: "#ef6c00",
    flexBasis: "48%",
    marginBottom: 10,
    height: 55,
  },
});


