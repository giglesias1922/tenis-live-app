import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CurrentMatch from "../screens/MatchScreens/CurrentMatch";
import * as matchService from "../services/matchService"

export type HomeStackParamList = {
    HomeMain: undefined;
    CurrentMatch: { match: matchService.Match };
  };

  const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false, headerBackButtonDisplayMode: "minimal" }}>
          <HomeStack.Screen name="HomeMain" component={HomeScreen} />
          <HomeStack.Screen name="CurrentMatch" component={CurrentMatch} />
        </HomeStack.Navigator>
      );
}
