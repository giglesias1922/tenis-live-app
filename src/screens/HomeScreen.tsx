import React from 'react';
import { useEffect, useState } from "react";
import { ImageBackground , StyleSheet } from "react-native";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Button,Surface,ActivityIndicator, Text} from "react-native-paper"
import { RootStackParamList } from "../navigation/AppNavigator";
import * as matchService from "../services/matchService";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {getErrorMessage} from "../helpers/ErrorHelper"

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

      setData(response.data);

    } catch (error:unknown) 
    {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      
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

  if(loading)
  {
    return (
    <ActivityIndicator
        animating={true}
        size="large"
        style={{ marginTop: 40 }}
    />    
    )
  }

  if(error)
  {
    return(
        <Surface style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Text style={{ marginBottom: 10 }}>
            No se pudo conectar con el servidor
          </Text>
    
          <Button mode="contained" onPress={load}>
            Reintentar
          </Button>
        </Surface>    
        )
  }
  
  if(data==null){
    return (
        <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <Surface style={[styles.container, {paddingBottom:100}]}>
            <Button
                mode="contained"
                icon={() => (
                  <MaterialCommunityIcons name="play" size={28} />
                )}
                onPress={onStartMatch}
                style={styles.startButton}
              >
                Iniciar Partido
            </Button>
        </Surface>
      </ImageBackground>
      )
    }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex:1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    elevation: 4,
  },

  startText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

});