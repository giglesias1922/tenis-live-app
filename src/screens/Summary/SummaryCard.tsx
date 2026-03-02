import { Card, Text, useTheme, Icon } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import * as matchService from "../../services/matchService";
import { GetResultText } from "../../helpers/setLoyoutHelper";

type Props = {
  match: matchService.MatchClosed;
  onPress?: (match: matchService.MatchClosed) => void;
};

export default function SummaryCard({ match, onPress }: Props) {
  const theme = useTheme();

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}
      onPress={() => onPress?.(match)}
      elevation={3}
    >
      <Card.Content>

        {/* HEADER */}
        <View style={styles.header}>
          <Text variant="bodySmall">
            {new Date(match.startTime).toLocaleString()}
          </Text>

          <Icon source="chart-bar" size={22} />
        </View>

        {/* JUGADORES */}
        <Text variant="titleMedium" style={styles.players}>
          {match.clubName} vs {match.opponentName}
        </Text>

        {/* RESULTADO GRANDE */}
        <Text style={styles.result}>
          {GetResultText(match.sets)}
        </Text>

        {/* RONDA */}
        <Text variant="bodySmall">
          Ronda: {match.round ?? "-"}
        </Text>

        {/* ESTADO */}
        <View
          style={[
            styles.badge,
            { backgroundColor: match.won ? "#4CAF50" : "#E53935" },
          ]}
        >
          <Text style={styles.badgeText}>
            {match.won ? "GANADO" : "PERDIDO"}
          </Text>
        </View>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    width: "90%",
    marginVertical: 8
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },

  players: {
    marginTop: 2,
    marginBottom: 8
  },

  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8
  },

  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  }
});