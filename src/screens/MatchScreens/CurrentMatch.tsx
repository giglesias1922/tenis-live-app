import React,{useEffect} from "react";
import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import CloseSetModal from "../MatchScreens/CloseSetModal";
import * as setService from "../../services/setService";
import MatchActions from "../../screens/MatchScreens/MatchActions";
import MatchHeader from "../../screens/MatchScreens/MatchHeader";
import axios, { AxiosError } from "axios";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "CurrentMatch"  
>;

export default function CurrentMatch({ navigation, route }: Props) {
    const [currentMatch, setCurrentMatch] = useState(route.params.match);
    const [showModal, setShowModal] = useState(false);
    const [error,setError] = useState(null);

    const handleCloseSet = () => {
        setShowModal(true);
      };

    const handleConfirmSet = async (myGames: number, opponentGames: number) => {
      console.log("Resultado:", myGames, opponentGames);
    try{
      const data: setService.CloseSetInput = {
        setId: Number(currentMatch.currentSetId),
        playerGames:myGames,
        opponentGames:opponentGames
      }
      const response = await setService.closeSet(data)

      console.log(response);
      console.log(response.data);

      const result = response.data;

    if (result.matchFinished) {
      Alert.alert("Partido finalizado");
      
      navigation.replace("Home");
      return;
    }

    // 🔥 Si sigue abierto, actualizar estado local
    setCurrentMatch(prev => ({
      ...prev,
      currentSetId: result.nextSet.id,
      currentSetNumber: result.nextSet.setNumber
    }));

    setShowModal(false);
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.response?.data);
    } else {
      console.log("Unknown error:", error);
    }
  }
    };
      

      
    const goHome = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
        });
    };

    

  if (!currentMatch) {
    return (
        <View style={{ flex: 1 }}>
        <Text>No hay ningún match activo</Text>
        <TouchableOpacity onPress={goHome} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentMatch.currentSetId) {
    return (
    <View style={{ flex: 1 }}>
        <Text>El match no tiene un set activo</Text>
        <TouchableOpacity onPress={goHome} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  

  return (    
    <View style={{ flex: 1 }}>
        <MatchHeader {...currentMatch} onCloseSet={handleCloseSet} />

        <View style={{ flex: 1 }}>
          <MatchActions matchId={currentMatch.id} setId={currentMatch.currentSetId}/> 
        </View>

        <CloseSetModal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          onConfirm={handleConfirmSet}
        />
        <Text>{error}</Text>
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