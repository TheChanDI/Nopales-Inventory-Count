import CollapsibleView from "@/components/CollapsibleView";
import { Container } from "@/components/Container";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

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
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ flex: 1 }}
    >
      <Container style={{ paddingHorizontal: 20, paddingTop: 10 }}>
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
