import { useColorScheme } from "@/hooks/useColorScheme";
import { Fonts } from "@/theme/fonts";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Playpenlight: require("../assets/fonts/PlaypenSans-Light.ttf"),
    PlaypenRegular: require("../assets/fonts/PlaypenSans-Regular.ttf"),
    PlaypenMedium: require("../assets/fonts/PlaypenSans-Medium.ttf"),
    PlaypenSemiBold: require("../assets/fonts/PlaypenSans-SemiBold.ttf"),
    PlaypenBold: require("../assets/fonts/PlaypenSans-Bold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Nopales Inventory Count",

            headerTitleStyle: {
              color: "white",
              fontFamily: Fonts.semiBold_font,
            },
            headerStyle: {
              backgroundColor: "#576056",
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}
