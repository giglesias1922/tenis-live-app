import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventTypeListScreen from "../screens/EventTypeListScreen";
import EventTypeFormScreen from "../screens/EventTypeFormScreen";
import NewMatchScreen from "../screens/MatchScreens/NewMatch";
import { View, Text, Image } from "react-native";

export type RootStackParamList = {
  EventTypeList: undefined;
  EventTypeForm: { id?: number };
  Home: undefined;
  NewMatch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "left",
        }}
      >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
          <Stack.Screen name="EventTypeList" component={EventTypeListScreen} options={{ title: "Tipos de Evento" }} />
          <Stack.Screen name="EventTypeForm" component={EventTypeFormScreen} options={{ title: "Evento" }} />
          <Stack.Screen name="NewMatch" component={NewMatchScreen} options={{ title: "Nuevo Partido" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HeaderTitle() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../assets/tennisball.png")}
        style={{ width: 24, height: 24, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Tennis <Text style={{ color: "red" }}>Live</Text>
      </Text>
    </View>
  );
}
