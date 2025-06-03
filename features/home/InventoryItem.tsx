import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import useInventoryStore from "@/store/useInventoryStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  type: string;
  label: string;
  perBox: number;
}

const InventoryItem = ({ label, perBox, type }: Props) => {
  const inventory = useInventoryStore((state) => state.inventory);
  const setInventory = useInventoryStore((state) => state.setInventory);
  const count = inventory[type]?.[label]?.count ?? 0;
  const boxCount = inventory[type]?.[label]?.boxCount ?? 0;

  const increment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (count === perBox - 1) {
      setInventory({
        ...inventory,
        [type]: {
          ...inventory[type],
          [label]: {
            count: 0,
            boxCount: boxCount + 1,
          },
        },
      });
    } else {
      setInventory({
        ...inventory,
        [type]: {
          ...inventory[type],
          [label]: {
            ...inventory[type]?.[label],
            count: count + 1,
          },
        },
      });
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
              setInventory({
                ...inventory,
                [type]: {
                  ...inventory[type],
                  [label]: {
                    ...inventory[type]?.[label],
                    count: count > 0 ? count - 1 : 0,
                  },
                },
              });
            }}
            activeOpacity={0.7}
          >
            <AntDesign name="minussquareo" size={22} color="#273022" />
          </TouchableOpacity>
          <TextComponent style={{ fontSize: 22 }}>{count}</TextComponent>
          <TouchableOpacity onPress={increment} activeOpacity={0.7}>
            <AntDesign name="plussquareo" size={22} color="#273022" />
          </TouchableOpacity>
        </Container>
        <Container style={{ flexDirection: "row", marginLeft: 20, gap: 20 }}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

              setInventory({
                ...inventory,
                [type]: {
                  ...inventory[type],
                  [label]: {
                    ...inventory[type]?.[label],
                    boxCount: boxCount + 1,
                  },
                },
              });
            }}
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
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setInventory({
                ...inventory,
                [type]: {
                  ...inventory[type],
                  [label]: {
                    ...inventory[type]?.[label],
                    boxCount: boxCount > 0 ? boxCount - 1 : 0,
                  },
                },
              });
            }}
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
