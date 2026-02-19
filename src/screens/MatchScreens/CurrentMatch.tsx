import React,{useEffect} from "react";
import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text,  } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import CloseSetModal from "../MatchScreens/CloseSetModal";
import * as setService from "../../services/setService";
import MatchActions from "../../screens/MatchScreens/MatchActions";
import MatchHeader from "../../screens/MatchScreens/MatchHeader";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "CurrentMatch"  
>;

export default function CurrentMatch({ navigation, route }: Props) {
    const { match } = route.params;
    const [showModal, setShowModal] = useState(false);

    const handleCloseSet = () => {
        setShowModal(true);
        console.log("Modal visible:", showModal);
      };

      useEffect(() => {
        console.log("Modal visible cambió:", showModal);
      }, [showModal]);

      const handleConfirmSet = (myGames: number, opponentGames: number) => {
        console.log("Resultado:", myGames, opponentGames);
      
        // 👉 acá llamás tu servicio para cerrar set
        // await matchService.closeSet(match.id, match.currentSetId, myGames, opponentGames)
      
        setShowModal(false);
      };
      

      
    const goHome = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
        });
    };

  if (!match) {
    return (
        <View style={{ flex: 1 }}>
        <Text>No hay ningún match activo</Text>
        <TouchableOpacity onPress={goHome} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!match.currentSetId) {
    return (
    <View style={{ flex: 1 }}>
        <Text>El match no tiene un set activo</Text>
        <TouchableOpacity onPress={goHome} style={styles.retryButton}>
          <Text style={{ color: "white" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  <CloseSetModal
  visible={showModal}
  onDismiss={() => setShowModal(false)}
  onConfirm={handleConfirmSet}
/>

  return (    
    <View style={{ flex: 1 }}>
            <MatchHeader {...match} onCloseSet={handleCloseSet} />

            <View style={{ flex: 1 }}>
              <MatchActions matchId={match.id} setId={match.currentSetId}/> 
            </View>
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