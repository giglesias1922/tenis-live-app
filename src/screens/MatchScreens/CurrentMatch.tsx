import React,{useEffect} from "react";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import {Surface} from "react-native-paper"
import CloseSetModal from "../MatchScreens/CloseSetModal";
import * as setService from "../../services/setService";
import MatchActions from "../../screens/MatchScreens/MatchActions";
import MatchHeader from "../../screens/MatchScreens/MatchHeader";
import * as errorHelper from "../../helpers/ErrorHelper"
import * as matchService from "../../services/matchService"
import { useNavigation } from "@react-navigation/native";

type Props = {
  match: matchService.Match;
  onFinish:()=>void;
};

export default function CurrentMatch({ match, onFinish }: Props) {
  const navigation = useNavigation<any>();
    const [currentMatch, setCurrentMatch] = useState<matchService.Match>(match);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleCloseSet = () => {
        setShowModal(true);
      };

    const handleConfirmSet = async (myGames: number, opponentGames: number) => {
      console.log("Resultado:", myGames, opponentGames);
      setErrorMessage(null);
      setIsLoading(true);
    try{
      const data: setService.CloseSetInput = {
        setId: Number(currentMatch.currentSetId),
        playerGames:myGames,
        opponentGames:opponentGames
      }

      console.log("data",data);
      const response = await setService.closeSet(data)

      
      console.log(response.data);
      const result = response.data;

    if (result.matchFinished) {
      Alert.alert("Partido finalizado");
      
      onFinish();
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
  catch (error: unknown) {
    const message = errorHelper.getErrorMessage(error);
  }
  finally{
    setIsLoading(false);
  }
    };

    

  if (!currentMatch) {
    return (
        <Surface style={{ flex: 1 }}>
        <Text>No hay ningún match activo</Text>
        <TouchableOpacity onPress={onFinish} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </Surface>
    );
  }

  if (!currentMatch.currentSetId) {
    return (
    <Surface style={{ flex: 1 }}>
        <Text>El match no tiene un set activo</Text>
        <TouchableOpacity onPress={onFinish} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </Surface>
    );
  }
  
  

  return (    
    <Surface style={{ flex: 1 }}>
        <MatchHeader {...currentMatch} onCloseSet={handleCloseSet} />

        <Surface style={{ flex: 1 }}>
          <MatchActions matchId={currentMatch.id} setId={currentMatch.currentSetId}/> 
        </Surface>

        <CloseSetModal
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
            setErrorMessage(null);
          }}
          onConfirm={handleConfirmSet} 
          errorMessage={errorMessage}
          isLoading={isLoading}
        />        
        
    </Surface>
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