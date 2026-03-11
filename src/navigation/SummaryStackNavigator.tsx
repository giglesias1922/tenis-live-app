import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SummaryHeaderScreen from "../screens/Summary/SummaryHeaderScreen";
import SummaryDetailScreen from "../screens/Summary/SummaryDetailScreen";
import * as matchService from "../services/matchService";
import { useTheme } from "react-native-paper";

export type SummaryStackParamList = {
  SummaryList: undefined;
  SummaryDetail: { match: matchService.MatchClosed };
};

const Stack = createNativeStackNavigator<SummaryStackParamList>();

export default function SummaryStackNavigator() {
    const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SummaryList"
        component={SummaryHeaderScreen}
        options={{ title: "Estadísticas",
        headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: "#fff"
         }}
      />
      <Stack.Screen
        name="SummaryDetail"
        component={SummaryDetailScreen}
        options={{ title: "Detalle",headerBackButtonDisplayMode: "minimal",
        headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: "#fff"
         }}
      />
    </Stack.Navigator>
  );
}