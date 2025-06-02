import { Container } from "@/components/Container";
import { TextComponent } from "@/components/TextComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
}

const InventoryItem = ({ label }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <Container style={{ marginBottom: 20 }}>
      <TextComponent style={{ fontSize: 20 }}>{label}</TextComponent>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
            onPress={() =>
              setCount((preValue) => (preValue > 0 ? preValue - 1 : 0))
            }
            activeOpacity={0.7}
          >
            <AntDesign name="minussquareo" size={22} color="black" />
          </TouchableOpacity>
          <TextComponent style={{ fontSize: 22 }}>{count}</TextComponent>
          <TouchableOpacity
            onPress={() => setCount(count + 1)}
            activeOpacity={0.7}
          >
            <AntDesign name="plussquareo" size={22} color="black" />
          </TouchableOpacity>
        </Container>
        <Container style={{ flexDirection: "row", marginLeft: 20, gap: 20 }}>
          <TouchableOpacity
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
