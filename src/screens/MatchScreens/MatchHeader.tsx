import React from "react";
import { Card, Text } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";

type MatchHeaderProps = {
    clubName: string;
    opponentName: string;
    round: string;
  };

  export default function MatchHeader({
    clubName,
    opponentName,
    round,
  }: MatchHeaderProps) {

    {/* HEADER */}
    return  (       
        
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleMedium">{clubName}</Text>
                <Text variant="titleMedium">vs. {opponentName}</Text>
                <Text variant="bodyMedium">{round}</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16
      }
})