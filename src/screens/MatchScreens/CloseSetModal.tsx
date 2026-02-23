import React, { useState } from "react";
import { View, StyleSheet,Alert } from "react-native";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (myGames: number, opponentGames: number) => void;
};

export default function CloseSetModal({
  visible,
  onDismiss,
  onConfirm
}: Props) {
  const [myGames, setMyGames] = useState("");
  const [opponentGames, setOpponentGames] = useState("");

  const handleConfirm = () => {
    onConfirm(Number(myGames), Number(opponentGames));
    setMyGames("");
    setOpponentGames("");
  };

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

        <Text>{error}</Text>
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
