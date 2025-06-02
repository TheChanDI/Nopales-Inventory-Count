import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import useInventoryStore from "@/store/useInventoryStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Linking, TouchableOpacity } from "react-native";

export default function RootLayout() {
  const inventory = useInventoryStore((state) => state.inventory);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const handleOnPress = () => {
    const formattedData = JSON.stringify(inventory, null, 2);
    const email = "rcklsschandi@gmail.com";
    const subject =
      "Bar Inventory Count for " + Date().toString().split("T")[0];
    const body = formattedData;
    const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoURL).catch((err) => console.error("Error:", err));
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Nopales Inventory Count",
            headerRight: () => (
              <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
                <AntDesign name="save" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: "white",
            },
            headerStyle: {
              backgroundColor: "#576056",
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
