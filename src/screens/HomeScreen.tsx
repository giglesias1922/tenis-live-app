import React from 'react';
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import {api} from "../config/api"

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<Math>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/match/active");
        
        setData(response.data);
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
    console.log("Empezar partido");
    navigation.navigate("NewMatch");
    // acá llamás a tu API / navegación
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data==null && (
          <View style={styles.container}>
            <TouchableOpacity onPress={onStartMatch} activeOpacity={0.8}>
              <Image
                source={require("../../assets/start-match.png")}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
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