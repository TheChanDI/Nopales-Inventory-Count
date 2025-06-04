import CollapsibleView from "@/components/CollapsibleView";
import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import useInventoryStore from "@/store/useInventoryStore";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

const sparkingList = [
  {
    label: "Amanti Prossecco NV Glera",
    perBox: 12,
  },
  {
    label: "Nino Franco RV",
    perBox: 6,
  },
  {
    label: "NV Jacquart Champagne",
    perBox: 1,
  },
];

const roseList = [
  {
    label: "2022 Dominique Porter Fontaine",
    perBox: 12,
  },
  {
    label: "La Resis Tance rose",
    perBox: 6,
  },
  {
    label: "2021 Cellier De Dauphins",
    perBox: 12,
  },
  {
    label: "2021 Val De Soleu",
    perBox: 6,
  },
  {
    label: "2018 Alta Alella - Cava Gran `Mirgin` Rose",
    perBox: 6,
  },
];
const HomeScreen = () => {
  const inventory = useInventoryStore((state) => state.inventory);
  const resetInventory = useInventoryStore((state) => state.resetInventory);

  const handleSentButton = () => {
    Alert.alert(
      "Confirm Submission",
      "Do you want to send the data?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: handleSave,
        },
      ],
      { cancelable: false }
    );
  };

  const handleSave = async () => {
    if (Object.entries(inventory).length === 0) {
      Toast.show({
        type: "error",
        text1: "No data to send.",
      });
      return;
    }

    console.log(inventory);
    try {
      const response = await fetch(
        "https://nopales-inv-backend.vercel.app/api/inventoryApi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventory),
        }
      );
      const msg = await response.json();
      Toast.show({
        type: "success",
        text1: msg?.message || "Email sent successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong.",
      });
    }
  };

  const handleResetButton = () => {
    Alert.alert(
      "Confirm Reset",
      "Do you want to reset the data?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => resetInventory(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E3E8E1" }}>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: "#DAE0D6",
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={handleSentButton}>
          <TextComponent>Sent</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResetButton} activeOpacity={0.7}>
          <TextComponent>Reset</TextComponent>
        </TouchableOpacity>
      </Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        style={{ flex: 1 }}
      >
        <Container
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <CollapsibleView
            data={sparkingList}
            title="Sparkling Wine"
          ></CollapsibleView>
          <CollapsibleView data={roseList} title="Rose"></CollapsibleView>
          <CollapsibleView title="Red Wine"></CollapsibleView>
          <CollapsibleView title="Tequilla (Blanco)"></CollapsibleView>
          <CollapsibleView title="Tequilla (Reposado)"></CollapsibleView>
          <CollapsibleView title="Tequilla (Anejo)"></CollapsibleView>
          <CollapsibleView title="Mezcal"></CollapsibleView>
          <CollapsibleView title="Spirits (Vodka)"></CollapsibleView>
          <CollapsibleView title="Spirits (Gin)"></CollapsibleView>
          <CollapsibleView title="Spirits (Scotch)"></CollapsibleView>
          <CollapsibleView title="Spirits (Whiskey)"></CollapsibleView>
          <CollapsibleView title="Spirits (Rum)"></CollapsibleView>
          <CollapsibleView title="Beers"></CollapsibleView>
          <CollapsibleView title="Liqueur"></CollapsibleView>
          <CollapsibleView title="Miscellaneous"></CollapsibleView>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
