import {Card,Surface,Text } from 'react-native-paper'
import React from 'react'
import * as matchService from "../../services/matchService.js"

type Props = {
  match: matchService.MatchClosed;
  onPress: (selectedMatchId: number) => void;
};

export default function SummaryCard({match,onPress}:Props) {  
    return (
        <Surface>
        <Card style={{ marginBottom: 12}} onPress={(s)=>onPress(match.matchId)}>
          <Card.Content>
            <Text variant="bodyMedium">
              {new Date(match.startTime).toLocaleString()}
            </Text>
            <Text variant="titleMedium">
              {match.clubName} vs {match.opponentName}
            </Text>
    
            <Text variant="bodyMedium">
              Ronda: {match.round ?? "-"}
            </Text>   
            
    
            <Text
              variant="bodyMedium"
              style={{
                marginTop: 8,
                color: match.won ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {match.won ? "Ganado" : "Perdido"}
            </Text>
          </Card.Content>
        </Card>
        </Surface>
  )
}