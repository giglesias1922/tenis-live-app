import React from 'react';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Button,Surface,TouchableRipple} from "react-native-paper"
import { RootStackParamList } from "../navigation/AppNavigator";
import * as matchService from "../services/matchService";
import { useNavigation } from "@react-navigation/native";


type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [data, setData] = useState<matchService.Match | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const load = async () =>
  {
    try {
      setError(null);
      setLoading(true);

      const response = await matchService.getActiveMatch();
      console.log(response.data);

      setData(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {       
      load();
  }, [])

  useEffect(() => {
    if( data && !loading)
      navigation.replace("CurrentMatch", { match: data });
  }, [data,loading])
  
  
  const onStartMatch = () => {
    navigation.navigate("NewMatch");
  };

  return (
    <Surface style={{ flex: 1 }}>
      {loading ?(
        <Text>Cargando...</Text>

      ) : error ? (
        <Surface style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Text style={{ marginBottom: 10 }}>
            No se pudo conectar con el servidor
          </Text>
    
          <Button mode="contained" onPress={load}>
            <Text >Reintentar</Text>
          </Button>
        </Surface>
    
      ) : data==null ? (
          <Surface style={styles.container}>
            <TouchableRipple onPress={onStartMatch}>
              <Image
                source={require("../../assets/start-match.png")}
                style={styles.buttonImage}
              />
            </TouchableRipple>
          </Surface>
      ) : null
    }
    </Surface>
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