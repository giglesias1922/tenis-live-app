import React from 'react';
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
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
    <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>

            <MatchHeader opponentName={data.opponentName} round={data.round} clubName='das'/>

            <View style={{ flex: 1 }}>
              {/* <MatchActions/> */}
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
});