import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import * as eventTypeService from "../services/eventTypeService";

type EventType = {
  id: number;
  code: string;
  description: string;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "EventTypeList"
>;

export default function EventTypeListScreen({ navigation }: Props) {
  const [data, setData] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {

        
        const response = await eventTypeService.getEventTypes();
        
        setData(response);
      } catch (error) {
        setError("No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="➕ Nuevo Evento"
        onPress={() => navigation.navigate("EventTypeForm", { id: undefined })}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.code}>{item.code}</Text>
            <Text>{item.description}</Text>

            <Button
              title="Editar"
              onPress={() =>
                navigation.navigate("EventTypeForm", { id: item.id })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      paddingTop: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      paddingHorizontal: 16,
      marginBottom: 10,
    },
    card: {
      backgroundColor: "#fff",
      marginHorizontal: 16,
      marginVertical: 6,
      padding: 12,
      borderRadius: 10,
      elevation: 2, // sombra Android
    },
    code: {
      fontSize: 14,
      fontWeight: "bold",
    },
    description: {
      fontSize: 13,
      color: "#555",
      marginTop: 4,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: "red",
      fontSize: 16,
    },
  });
  