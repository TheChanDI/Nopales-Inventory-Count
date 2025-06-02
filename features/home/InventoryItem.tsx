import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  perBox: number;
}

const InventoryItem = ({ label, perBox }: Props) => {
  const [count, setCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);

  const increment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (count === perBox - 1) {
      setCount(0);
      setBoxCount(boxCount + 1);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <Container style={{ marginBottom: 20 }}>
      <Container
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TextComponent style={{ fontSize: 20, flex: 2 }}>{label}</TextComponent>
        <TextComponent style={{ fontSize: 12, color: "gray" }}>
          {" "}
          {perBox} per box
        </TextComponent>
        <Container style={{ flex: 1, alignItems: "flex-end" }}>
          <TextComponent style={{ fontSize: 17 }}>
            {perBox !== 1 ? (count === perBox ? "0" : `${count} 🍾 `) : ""}
            {boxCount} 📦
          </TextComponent>
        </Container>
      </Container>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Container
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setCount((preValue) => (preValue > 0 ? preValue - 1 : 0));
            }}
            activeOpacity={0.7}
          >
            <AntDesign name="minussquareo" size={22} color="black" />
          </TouchableOpacity>
          <TextComponent style={{ fontSize: 22 }}>{count}</TextComponent>
          <TouchableOpacity onPress={increment} activeOpacity={0.7}>
            <AntDesign name="plussquareo" size={22} color="black" />
          </TouchableOpacity>
        </Container>
        <Container style={{ flexDirection: "row", marginLeft: 20, gap: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setBoxCount(boxCount + 1);
            }}
            activeOpacity={0.7}
            style={{
              backgroundColor: "black",
              paddingHorizontal: 10,
              borderRadius: 2,
            }}
          >
            <TextComponent style={{ fontSize: 16, color: "white" }}>
              Add Box
            </TextComponent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setBoxCount((preValue) => (preValue > 0 ? preValue - 1 : 0))
            }
            activeOpacity={0.7}
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              borderRadius: 2,
            }}
          >
            <TextComponent style={{ fontSize: 16 }}>Subtract Box</TextComponent>
          </TouchableOpacity>
        </Container>
      </Container>
    </Container>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({});
