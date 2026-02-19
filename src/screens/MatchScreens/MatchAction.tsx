import React from 'react'
import {View,StyleSheet, Text} from "react-native"
import * as eventTypesService from "../../services/eventTypeService"
import { Button } from "react-native-paper";

type MatchActionProps = {
    data: eventTypesService.EventTypeRow[];
    onAction: (eventTypeId: number) => void;
  };
  
export const MatchAction = ({data,onAction}:MatchActionProps) => {
  return (
    <View style={styles.grid}>
            {data
              .map(e => (
                
                <Button
                    key={e.id}
                    mode="contained"
                    style={[styles.button, { backgroundColor: e.buttonColour }]}
                    contentStyle={styles.content}
                    onPress={() => onAction(e.id)}
                    >
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>
                        {e.buttonText ?? e.description}
                        </Text>
                    </View>
                    </Button>

              ))}
    </View>
  )
}

const styles = StyleSheet.create({
grid: {
    flexDirection: "column",
    // flexWrap: ""wrap"",
    justifyContent: "space-between",
  },

  button: {
    width: "90%",
    height: 70,
    marginBottom: 10,
  },
  
  content: {
    height: "100%",
  },
  
  labelContainer: {
    flex: 1,                 // ocupa todo el alto
    justifyContent: "center",// centra vertical
    alignItems: "center",    // centra horizontal
  },
  
  label: {
    textAlign: "center",
    flexWrap: "wrap",
    color:"white",
    fontWeight:"bold"
  },
  
});