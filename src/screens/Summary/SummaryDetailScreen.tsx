import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {
  Surface,
  Text,
  DataTable,
  ActivityIndicator
} from "react-native-paper";
import * as matchEventService from "../../services/matchEventService";
import SummaryCard from "./SummaryCard";
import { getErrorMessage } from "../../helpers/ErrorHelper";
import { ScrollView,View } from "react-native";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SummaryDetail"
>;

export default function SummaryDetailScreen({ route }: Props) {
  const { match } = route.params;

  const [data, setData] = useState<matchEventService.MatchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await matchEventService.GetSummary(match.matchId);
        setData(response);
      } catch (error) {
        setError(getErrorMessage(error));
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Agrupar estadísticas por tipo
  const grouped = data.reduce<
    Record<string, matchEventService.MatchSummary[]>
  >((acc, item) => {
    if (!acc[item.buttonGroup]) {
      acc[item.buttonGroup] = [];
    }

    acc[item.buttonGroup].push(item);
    return acc;
  }, {});

  const groupNames: Record<string, string> = {
    SERVICE: "Servicio",
    ERROR: "Errores",
    BREAKPOINT: "Break Points"
  };

  return (
    <Surface style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={{ padding: 16, width:"100%" }}>


        <View style={{margin:20,width:"100%"}}>
        {/* Tarjeta del partido */}
        <SummaryCard match={match} />
        </View>

        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{ marginTop: 40 }}
          />
        ) : error ? (
          <Surface
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40
            }}
          >
            <Text>{error}</Text>
          </Surface>
        ) : (
          Object.entries(grouped).map(([group, items]) => (
            <Surface key={group} style={{ marginTop: 24 }}>

              <Text
                variant="titleMedium"
                style={{ marginBottom: 6, fontWeight: "bold" }}
              >
                {groupNames[group] ?? group}
              </Text>

              <DataTable>

                {items.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={{ flex: 3 }}>
                      {item.event}
                    </DataTable.Cell>

                    <DataTable.Cell numeric style={{ flex: 1 }}>
                      {item.count}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

              </DataTable>

            </Surface>
          ))
        )}

      </ScrollView>

    </Surface>
  );
}