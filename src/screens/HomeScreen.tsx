import React from 'react';
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import * as matchService from "../services/matchService";

import MatchActions from "../screens/MatchScreens/MatchActions";
import MatchHeader from "../screens/MatchScreens/MatchHeader";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<matchService.Match | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  async function   fetchData ()
   {
    try {
      setError(null);
      setLoading(true);

      const response = await matchService.getActiveMatch();
      
      setData(response.data);
    } catch (error) {
      console.warn(error);
      setError("No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onStartMatch = () => {
    navigation.navigate("NewMatch");
    // acá llamás a tu API / navegación
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ?(
        <Text>Cargando...</Text>

      ) : error ? (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Text style={{ marginBottom: 10 }}>
            No se pudo conectar con el servidor
          </Text>
    
          <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
            <Text style={{ color: "white" }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
    
      ) : data==null ? (
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
        <View style={{ flex: 1 }}>

            <MatchHeader opponentName={data.opponentName} round={data.round} clubName='das'/>

            <View style={{ flex: 1 }}>
              <MatchActions/> 
            </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
  },
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
  retryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});