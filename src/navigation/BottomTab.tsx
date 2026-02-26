import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SummaryHeaderScreen from "../screens/Summary/SummaryHeaderScreen";

export type BottomTabParamList = {
  HomeMain: undefined;
  SummaryMain: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTab() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level2,
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<
            typeof MaterialCommunityIcons
          >["name"];

          if (route.name === "HomeMain") iconName = "home";
          else iconName = "chart-bar";

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="SummaryMain"
        component={SummaryHeaderScreen}
        options={{ title: "Resumen" }}
      />
    </Tab.Navigator>
  );
}