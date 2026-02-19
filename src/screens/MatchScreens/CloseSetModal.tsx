import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (myGames: number, opponentGames: number) => void;
  isSuperTiebreak: boolean;
};

export default function CloseSetModal({
  visible,
  onDismiss,
  onConfirm,
  isSuperTiebreak
}: Props) {
  const [myGames, setMyGames] = useState<number>(0);
  const [opponentGames, setOpponentGames] = useState<number>(0);

  const handleConfirm = () => {
    const {valid, error} = validateSetResult();

    if(!valid)
    {
      console.log(error);
      return;
    }

    onConfirm(Number(myGames), Number(opponentGames));
    setMyGames(0);
    setOpponentGames(0);
  };

  function validateSetResult(): { valid: boolean; error?: string } {
  
    if (myGames < 0 || opponentGames < 0) return { valid: false, error: "Los puntajes no pueden ser negativos" };
  
    if (isSuperTiebreak) {
      const max = Math.max(myGames, opponentGames);
      const diff = Math.abs(myGames - opponentGames);
      if (max < 10 || diff < 2) return { valid: false, error: "Super tiebreak: mínimo 10 puntos y diferencia de 2" };
    } else {
      const max = Math.max(myGames, opponentGames);
      const min = Math.min(myGames, opponentGames);
      const diff = max - min;
  
      if (max < 6) return { valid: false, error: "Se necesita al menos 6 juegos para ganar el set" };
  
      if (max === 6 && diff < 2 && max + min < 12) return { valid: false, error: "Diferencia insuficiente" };
  
      if (max > 7 || min > 7) return { valid: false, error: "Resultado inválido" };
      if (max === 7 && !(min === 5 || min === 6)) return { valid: false, error: "7 solo es válido con 5 o 6 del otro jugador" };
    }
  
    return { valid: true };
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text variant="titleLarge" style={styles.title}>
          Cerrar Set
        </Text>

        <TextInput
          label="Tus games"
          keyboardType="numeric"
          mode="outlined"
          value={myGames}
          onChangeText={setMyGames}
          style={styles.input}
        />

        <TextInput
          label="Games rival"
          keyboardType="numeric"
          mode="outlined"
          value={opponentGames}
          onChangeText={setOpponentGames}
          style={styles.input}
        />

        <View style={styles.buttons}>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button mode="contained" onPress={handleConfirm}>
            Confirmar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
