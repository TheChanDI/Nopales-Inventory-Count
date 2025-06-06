import CollapsibleView from "@/components/CollapsibleView";
import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import useInventoryStore from "@/store/useInventoryStore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
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

const redWineList = [
  {
    label: "2021 Campos de Espana Tempranilo",
    perBox: 6,
  },
  {
    label: "Vineto Tempranillo",
    perBox: 6,
  },
  {
    label: "2022 Astrale Chianti DOCG",
    perBox: 12,
  },
  {
    label: "2021 Tesoro De Los Andes",
    perBox: 12,
  },
  {
    label: "2022 YP Shiraz",
    perBox: 12,
  },
  {
    label: "Highgate Shiraz",
    perBox: 12,
  },
  {
    label: "2019 Chakana - Finca Los Cedros Malbec",
    perBox: 6,
  },
  {
    label: "2021 Uvo non Grata Gamay",
    perBox: 12,
  },
  {
    label: "2020 Harewood Reserve Cab Sauv",
    perBox: 12,
  },
  {
    label: "2023 Mulline, Pinot Noir",
    perBox: 12,
  },
  {
    label: "2017 Vina Ijalba Doca Reserva, Tempranillo",
    perBox: 6,
  },
  {
    label: "2015 La Sorda Reserva Rijoc",
    perBox: 1,
  },
  {
    label: "2016 Michele Chairlo Barolo Tortoniano",
    perBox: 1,
  },
];

const whiteWineList = [
  {
    label: "2022 Mezzacorona | Classic Pinot Grigio",
    perBox: 12,
  },
  {
    label: "Hentyfarm pino grigio",
    perBox: 12,
  },
  {
    label: "2022 Highgate Organic Chardonnay",
    perBox: 12,
  },
  {
    label: "2021 Franxamar Atlantic White Albarino",
    perBox: 12,
  },
  {
    label: "2021 SH Certified Organic Sauv Blanc",
    perBox: 12,
  },
  {
    label: "2023 Harewood Denmark Riesling",
    perBox: 12,
  },
  {
    label: "2022 Harewood Denmark Sauvignon Blanc Semillon",
    perBox: 12,
  },
  {
    label: "Great Southern Riesling",
    perBox: 12,
  },
  {
    label: "2021 AS Vincenzo Organic",
    perBox: 6,
  },
  {
    label: "2022 Lightfoot Chardonay",
    perBox: 12,
  },
  {
    label: "2020 Bodegas Tempo IGP, White Grenache",
    perBox: 6,
  },
  {
    label: "2020 Rieslingfreak",
    perBox: 3,
  },
  {
    label: "2021 Les Allees du Vignoble Chablis",
    perBox: 1,
  },
];

const beerList = [
  {
    label: "Peroni",
    perBox: 24,
  },
  {
    label: "Sol Cerveza",
    perBox: 24,
  },
  {
    label: "Balter Cerveza",
    perBox: 24,
  },
  {
    label: "Heaps Normal",
    perBox: 24,
  },
  {
    label: "Hazy IPA",
    perBox: 16,
  },
  {
    label: "Corona Extra",
    perBox: 24,
  },
  {
    label: "Stone & Wood Pacific Ale",
    perBox: 24,
  },
  {
    label: "Model Espadin",
    perBox: 24,
  },
  {
    label: "Young Henry cloudy cider",
    perBox: 24,
  },
  {
    label: "Ginger Beer",
    perBox: 10,
  },
];

const HomeScreen = () => {
  const inventory = useInventoryStore((state) => state.getInventory());
  const resetInventory = useInventoryStore((state) => state.resetInventory);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  /**
   * Handles the logic for when the "Sent" button is pressed.
   * This function sets the modal visibility to true, triggering
   * the modal to appear on the screen.
   */

  const handleSentButton = () => {
    setIsModalVisible(true);
  };
  const handleSave = async () => {
    setIsModalVisible(false);
    if (Object.entries(inventory).length === 0) {
      Toast.show({
        type: "error",
        text1: "No data to send.",
      });
      return;
    }

    if (!recipientEmail) {
      Toast.show({
        type: "error",
        text1: "Please enter an email.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://nopales-inv-backend.vercel.app/api/inventoryApi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: recipientEmail,
            data: inventory,
          }),
        }
      );
      const msg = await response.json();
      setIsLoading(false);
      setRecipientEmail("");
      Toast.show({
        type: "success",
        text1: msg?.message || "Email sent successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setRecipientEmail("");
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
      {isLoading && (
        <Container style={styles.indicatorContainer}>
          <ActivityIndicator size={"large"} color={"#273022"} />
          <TextComponent style={{ alignSelf: "center", marginTop: 10 }}>
            Sending...
          </TextComponent>
        </Container>
      )}
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
          <CollapsibleView
            data={redWineList}
            title="Red Wine"
          ></CollapsibleView>
          <CollapsibleView
            data={whiteWineList}
            title="White Wine"
          ></CollapsibleView>
          <CollapsibleView title="Tequilla (Blanco)"></CollapsibleView>
          <CollapsibleView title="Tequilla (Reposado)"></CollapsibleView>
          <CollapsibleView title="Tequilla (Anejo)"></CollapsibleView>
          <CollapsibleView title="Mezcal"></CollapsibleView>
          <CollapsibleView title="Spirits (Vodka)"></CollapsibleView>
          <CollapsibleView title="Spirits (Gin)"></CollapsibleView>
          <CollapsibleView title="Spirits (Scotch)"></CollapsibleView>
          <CollapsibleView title="Spirits (Whiskey)"></CollapsibleView>
          <CollapsibleView title="Spirits (Rum)"></CollapsibleView>
          <CollapsibleView data={beerList} title="Beers"></CollapsibleView>
          <CollapsibleView title="Liqueur"></CollapsibleView>
          <CollapsibleView title="Miscellaneous"></CollapsibleView>
        </Container>
      </ScrollView>

      <Modal visible={isModalVisible} transparent style={{}}>
        <Container style={styles.modalView}>
          <Container>
            <TextComponent style={{ fontSize: 16 }}>
              Enter the email address where you want to send the Excel file.
            </TextComponent>
            <TextInput
              value={recipientEmail}
              onChangeText={(text) => setRecipientEmail(text)}
              style={{
                margin: 0,
                padding: 6,
                borderWidth: 0.5,
                borderColor: "gray",
                borderRadius: 2,
              }}
              placeholder="email"
            />
            <Container
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setRecipientEmail("");
                  setIsModalVisible(false);
                }}
              >
                <TextComponent style={{ fontSize: 16, color: "red" }}>
                  Cancel
                </TextComponent>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <TextComponent style={{ fontSize: 16 }}>Send</TextComponent>
              </TouchableOpacity>
            </Container>
          </Container>
        </Container>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    zIndex: 1,
    height: 120,
    width: 150,
    backgroundColor: "#f2f2f2",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 4,
    left: "30%",
    top: "40%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    marginTop: "40%",
  },
});
