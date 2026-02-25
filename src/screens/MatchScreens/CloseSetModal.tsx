import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  Surface,
  useTheme 
} from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (myGames: number, opponentGames: number) => Promise<void>;
  errorMessage?: string | null;
  isLoading: boolean;
};

export default function CloseSetModal({
  visible,
  onDismiss,
  onConfirm,
  errorMessage,
  isLoading,
}: Props) {


  const theme = useTheme();
  const [myGames, setMyGames] = useState("");
  const [opponentGames, setOpponentGames] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      setMyGames("");
      setOpponentGames("");
      setLocalError(null);
    }
  }, [visible]);

  const handleConfirm = async () => {
    setLocalError(null);

    if (!myGames || !opponentGames) {
      setLocalError("Debes completar los games.");
      return;
    }

    const my = Number(myGames);
    const opp = Number(opponentGames);

    if (isNaN(my) || isNaN(opp)) {
      setLocalError("Los valores deben ser numéricos.");
      return;
    }

    if (my < 0 || opp < 0) {
      setLocalError("Los games no pueden ser negativos.");
      return;
    }

    await onConfirm(my, opp);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={isLoading ? () => {} : onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.elevation.level3 }
        ]}
>
        <Text
          variant="titleLarge"
          style={[
            styles.title,
            { color: theme.colors.onSurface }
          ]}
        >
          Cerrar Set
        </Text>
        <Surface style={styles.scoreBoard}>
  <Surface style={styles.columns}>
    
    {/* COLUMNA YO */}
    <Surface style={styles.column}>
      <TextInput
        mode="outlined"
        style={styles.scoreInput}
        contentStyle={styles.scoreContent}
        keyboardType="number-pad"
        value={myGames}
        onChangeText={(text) => {
          setLocalError(null);
          setMyGames(text);
        }}
        maxLength={2}
      />
      <Text style={styles.playerName}>YO</Text>
    </Surface>

    {/* DASH */}
    <Text style={styles.dash}>–</Text>

    {/* COLUMNA RIVAL */}
    <Surface style={styles.column}>
      <TextInput
        mode="outlined"
        style={styles.scoreInput}
        contentStyle={styles.scoreContent}
        keyboardType="number-pad"
        value={opponentGames}
        onChangeText={(text) => {
          setLocalError(null);
          setOpponentGames(text);
        }}
        maxLength={2}
      />
      <Text style={styles.playerName}>RIVAL</Text>
    </Surface>

  </Surface>
</Surface>

        {(localError || errorMessage) && (
          <Text style={[styles.errorText,{color:theme.colors.error}]}>
            {localError ?? errorMessage}
          </Text>
        )}

        <Surface style={styles.buttons}>
          <Button
            mode="text"
            onPress={onDismiss}
            disabled={isLoading}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            onPress={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
            style={styles.confirmButton}
          >
            Confirmar
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    margin: 20,
    borderRadius: 28,
  },

  columns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  column: {
    alignItems: "center",
  },
  
  playerName: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1.2,
    textAlign: "center",
  },

  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },

  scoreBoard: {
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  scoreInput: {
    width: 90,
  },

  scoreContent: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "700",
  },

  dash: {
    fontSize: 30,
    fontWeight: "700",
    marginHorizontal: 18,
  },


  errorText: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelButton: {
    flex: 1,
    marginRight: 10,
  },

  confirmButton: {
    flex: 1,
    marginLeft: 10,
  },
});