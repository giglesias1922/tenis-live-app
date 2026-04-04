
import AppNavigator from "./src/navigation/AppNavigator";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  useKeepAwake();
  return <PaperProvider theme={MD3DarkTheme}>
      <AppNavigator />
  </PaperProvider>
}