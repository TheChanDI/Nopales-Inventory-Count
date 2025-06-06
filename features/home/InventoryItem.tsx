import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import useInventoryStore from "@/store/useInventoryStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import shallow from "zustand/shallow";

interface Props {
  type: string;
  label: string;
  perBox: number;
}

const InventoryItem = ({ label, perBox, type }: Props) => {
  const inventory = useInventoryStore(
    (state) => state.inventory[type]?.[label],
    shallow
  );
  const setItem = useInventoryStore((state) => state.setItem);

  // Safely access count and boxCount
  const count = inventory?.count ?? 0;
  const boxCount = inventory?.boxCount ?? 0;

  // Increment logic
  const increment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (count === perBox - 1) {
      setItem(type, label, { count: 0, boxCount: boxCount + 1 });
    } else {
      setItem(type, label, { count: count + 1, boxCount });
    }
  };

  // Handle decrement
  const decrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setItem(type, label, { count: count > 0 ? count - 1 : 0, boxCount });
  };

  // Handle adding a box
  const addBox = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setItem(type, label, { count, boxCount: boxCount + 1 });
  };

  // Handle subtracting a box
  const subtractBox = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setItem(type, label, { count, boxCount: boxCount > 0 ? boxCount - 1 : 0 });
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
          <TouchableOpacity onPress={decrement} activeOpacity={0.7}>
            <AntDesign name="minussquareo" size={22} color="#273022" />
          </TouchableOpacity>
          <TextComponent style={{ fontSize: 22 }}>{count}</TextComponent>
          <TouchableOpacity onPress={increment} activeOpacity={0.7}>
            <AntDesign name="plussquareo" size={22} color="#273022" />
          </TouchableOpacity>
        </Container>
        <Container style={{ flexDirection: "row", marginLeft: 20, gap: 20 }}>
          <TouchableOpacity
            onPress={addBox}
            activeOpacity={0.7}
            style={{
              backgroundColor: "#273022",
              paddingHorizontal: 10,
              borderRadius: 2,
            }}
          >
            <TextComponent style={{ fontSize: 16, color: "white" }}>
              Add Box
            </TextComponent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={subtractBox}
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
