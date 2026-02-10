import React from 'react';
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import {api} from "../config/api"
import { Card, Text } from "react-native-paper";
import * as matchService from "../services/matchService";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<matchService.Match | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await matchService.getActiveMatch();
        
        setData(response.data);

        console.log(data);
      } catch (error) {
        console.warn(error);
        setError("No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const onStartMatch = () => {
    navigation.navigate("NewMatch");
    // acá llamás a tu API / navegación
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data==null ? (
          <View style={styles.container}>
            <TouchableOpacity onPress={onStartMatch} activeOpacity={0.8}>
              <Image
                source={require("../../assets/start-match.png")}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            </View>
      )
      : (
        <View style={styles.container}>
          <Card style={{ margin: 16 }}>
            <Card.Content>
              <Text variant="titleLarge">{data?.round}</Text>
              <Text>{"vs " + data?.opponentName}</Text>
            </Card.Content>
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 360,
    height: 260,
    borderRadius: 80, // la mitad → círculo perfecto
  },
});