import React from "react";
import { Card, Text,Chip,Surface  } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";

type MatchHeaderProps = {
    clubName: string;
    opponentName: string;
    round: string;
    startTime: string;
    currentSetNumber: number|null;
    currentSetId:number|null;
    onCloseSet: () => void;
  };

  export default function MatchHeader(data: MatchHeaderProps) {

    return  (       
        
        <Card style={styles.card}>
            <Card.Content>
            <Surface style={{flexDirection:"row", justifyContent: "space-between" }}>
                  <Text variant="titleMedium">{data.clubName}</Text>
                  <Text variant="bodyMedium">
                  {new Date(data.startTime)
                    .toLocaleString("sv-SE")
                    .slice(0, 16)}
                </Text>
                </Surface>
                <Text variant="bodyMedium">Ronda: {data.round}</Text>

                <Surface style={{flexDirection:"row", justifyContent: "space-between" }}>
                  <Text variant="bodyMedium">vs. {data.opponentName}</Text>                
                  <Chip icon="close" textStyle={styles.setButton} onPress={data.onCloseSet}>SET: {data.currentSetNumber}</Chip>
                </Surface>
                
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16
      },
    setButton:
    {
        fontSize:18
    }
})