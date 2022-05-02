import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";
import { useFonts } from "expo-font";
import { fonts } from "./src/theme/fonts";
import StoreProvider from "./src/contexts/StoreContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.regular]:
      "https://fonts.cdnfonts.com/s/15011/CircularStd-Medium.woff",
    [fonts.bold]: "https://fonts.cdnfonts.com/s/15011/CircularStd-Bold.woff",
  });
  if (!fontsLoaded)
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", flex: 1 }}
      />
    );
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <Navigation />
      </StoreProvider>
      <StatusBar />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}
