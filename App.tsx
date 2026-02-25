
import AppNavigator from "./src/navigation/AppNavigator";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

export default function App() {
  return <PaperProvider theme={MD3DarkTheme}>
      <AppNavigator />
  </PaperProvider>
}