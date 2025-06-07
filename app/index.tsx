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

const tequilaBlancoList = [
  {
    label: "Espolon Silver",
    perBox: 12,
  },
  {
    label: "Olmeca Altos Plata",
    perBox: 1,
  },
  {
    label: "Tromba Blanco",
    perBox: 1,
  },
  {
    label: "Don Juilo Blanco",
    perBox: 1,
  },
  {
    label: "Patron Silver",
    perBox: 1,
  },
  {
    label: "Kah tequila",
    perBox: 1,
  },
  {
    label: "Herradura Plata",
    perBox: 1,
  },
  {
    label: "Fortaleza Blanco",
    perBox: 1,
  },
  {
    label: "Tequila G4 Blanco",
    perBox: 6,
  },
];

const tequilaReposadoList = [
  {
    label: "Espolon Reposado",
    perBox: 12,
  },
  {
    label: "Don Juilo Reposado",
    perBox: 1,
  },
  {
    label: "Patron Reposado",
    perBox: 1,
  },
  {
    label: "Kah reposado",
    perBox: 1,
  },
  {
    label: "Herradura Reposado",
    perBox: 1,
  },
  {
    label: "Fortaleza Reposado",
    perBox: 1,
  },
  {
    label: "Tequila G4 Reposado",
    perBox: 6,
  },
];

const tequilaAnejoList = [
  {
    label: "Espolon Anejo",
    perBox: 12,
  },
  {
    label: "Don Juilo Anejo",
    perBox: 1,
  },
  {
    label: "Patron Anejo",
    perBox: 1,
  },
  {
    label: "La Cofradia Ceramic",
    perBox: 1,
  },
  {
    label: "Herradura Anejo",
    perBox: 1,
  },
  {
    label: "Fortaleza Anejo",
    perBox: 1,
  },
  {
    label: "Tequila G4 Anejo",
    perBox: 6,
  },
];

const mezcalList = [
  {
    label: "Quiquiriqui Espadin ",
    perBox: 1,
  },
  {
    label: "Wahaka Espadin",
    perBox: 1,
  },
  {
    label: "Los Siete Misterios ‘Doba-Yej ",
    perBox: 1,
  },
  {
    label: "Ilegal Joven",
    perBox: 1,
  },
  {
    label: "Ilegal Reposado",
    perBox: 1,
  },
  {
    label: "Ilegal Añejo",
    perBox: 1,
  },
  {
    label: "Joven metoro",
    perBox: 1,
  },
  {
    label: "El Jorgorjio Mexicana",
    perBox: 1,
  },
];

const vodkaList = [
  {
    label: "Grey Goose",
    perBox: 1,
  },
  {
    label: "Smirnoff",
    perBox: 1,
  },
  {
    label: "42 below",
    perBox: 1,
  },
];

const ginList = [
  {
    label: "Four pillars rare dry ",
    perBox: 1,
  },
  {
    label: "Gordons London Dry Gin",
    perBox: 1,
  },
  {
    label: "Hendrick’s ",
    perBox: 1,
  },
];

const scotchList = [
  {
    label: "Dewar's 12",
    perBox: 1,
  },
  {
    label: "Macallan 12 ",
    perBox: 1,
  },
];

const whiskeyList = [
  {
    label: "Jack Daniels ",
    perBox: 1,
  },
  {
    label: "Wild Turkey 101",
    perBox: 1,
  },
  {
    label: "Old Forester",
    perBox: 1,
  },
  {
    label: "Maker’s mark ",
    perBox: 1,
  },
  {
    label: "Jameson Irish Whisky",
    perBox: 1,
  },
];

const rumList = [
  {
    label: "Bacardi 8",
    perBox: 1,
  },
  {
    label: "Bacardi white rum",
    perBox: 1,
  },
  {
    label: "Sailor spiced ",
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

const liqueurList = [
  {
    label: "Maison Triple Sec",
    perBox: 12,
  },
  {
    label: "Midori Melon",
    perBox: 1,
  },
  {
    label: "Frangelico",
    perBox: 1,
  },
  {
    label: "Kahlua",
    perBox: 1,
  },
  {
    label: "Red Sweet Vermouth",
    perBox: 1,
  },
  {
    label: "Peach Schnapps",
    perBox: 1,
  },
  {
    label: "Pisco malpaso",
    perBox: 1,
  },
  {
    label: "Soho Lychee liqueur",
    perBox: 1,
  },
  {
    label: "Passionfruit liequeur",
    perBox: 1,
  },
  {
    label: "Chambord Raspberry liqueur",
    perBox: 1,
  },
  {
    label: "Blue curacao",
    perBox: 1,
  },
  {
    label: "Baileys",
    perBox: 1,
  },
  {
    label: "Sagatiba Cachaca",
    perBox: 1,
  },
  {
    label: "Campari",
    perBox: 1,
  },
  {
    label: "Disaronno Amaretto",
    perBox: 1,
  },
  {
    label: "Amaretti non Alchoholic",
    perBox: 1,
  },
  {
    label: "Aperol",
    perBox: 1,
  },
];

const miscellaneousList = [
  {
    label: "Foamer",
    perBox: 1,
  },
  {
    label: "Angostura Bitter",
    perBox: 1,
  },
  {
    label: "Coffee Tablets",
    perBox: 16,
  },
  {
    label: "Bloody Mary mix",
    perBox: 1,
  },
  {
    label: "Lime Juice Coridal",
    perBox: 1,
  },
  {
    label: "Cucumber Monin",
    perBox: 1,
  },
  {
    label: "Grenadine Monin",
    perBox: 1,
  },
];

/**
 * The HomeScreen component is the main screen of the app. It displays a list
 * of all the items in the inventory, grouped by category. The user can
 * scroll through the list and select an item to see its details.
 *
 * The screen also has a "Sent" button that triggers a modal to appear, which
 * prompts the user to enter an email address. When the user enters an email
 * address and presses the "Send" button, the app sends an email to the entered
 * email address with the current inventory as an Excel attachment.
 *
 * The screen also has a "Reset" button that resets the inventory to its
 * initial state.
 */
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
          <CollapsibleView
            data={tequilaBlancoList}
            title="Tequilla (Blanco)"
          ></CollapsibleView>
          <CollapsibleView
            data={tequilaReposadoList}
            title="Tequilla (Reposado)"
          ></CollapsibleView>
          <CollapsibleView
            data={tequilaAnejoList}
            title="Tequilla (Anejo)"
          ></CollapsibleView>
          <CollapsibleView data={mezcalList} title="Mezcal"></CollapsibleView>
          <CollapsibleView
            data={vodkaList}
            title="Spirits (Vodka)"
          ></CollapsibleView>
          <CollapsibleView
            data={ginList}
            title="Spirits (Gin)"
          ></CollapsibleView>
          <CollapsibleView
            data={scotchList}
            title="Spirits (Scotch)"
          ></CollapsibleView>
          <CollapsibleView
            data={whiskeyList}
            title="Spirits (Whiskey)"
          ></CollapsibleView>
          <CollapsibleView
            data={rumList}
            title="Spirits (Rum)"
          ></CollapsibleView>
          <CollapsibleView data={beerList} title="Beers"></CollapsibleView>
          <CollapsibleView data={liqueurList} title="Liqueur"></CollapsibleView>
          <CollapsibleView
            data={miscellaneousList}
            title="Miscellaneous"
          ></CollapsibleView>
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
