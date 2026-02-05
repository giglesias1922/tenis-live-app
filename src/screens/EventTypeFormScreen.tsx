import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type RouteProps = RouteProp<RootStackParamList, "EventTypeForm">;

export default function EventTypeFormScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const id = route.params?.id;

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://TU_BACKEND/event-types/${id}`)
        .then((r) => r.json())
        .then((data) => setDescription(data.description));
    }
  }, [id]);

  async function save() {
    if (id) {
      await fetch(`https://TU_BACKEND/event-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
    } else {
      await fetch(`https://TU_BACKEND/event-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: "ACE",
          description,
        }),
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Guardar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 8,
      marginVertical: 10,
      borderRadius: 6,
    },
  });
  