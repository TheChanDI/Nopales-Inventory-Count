import InventoryItem from "@/features/home/InventoryItem";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Container } from "./Container";
import { TextComponent } from "./TextComponent";

interface Props {
  children?: React.ReactNode;
  title: string;
  data?: Array<{
    label: string;
    perBox: number;
  }>;
}

const CollapsibleView = ({ children, title, data }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Container style={{ marginBottom: 20 }}>
      <TouchableOpacity
        onPress={() => setIsCollapsed((value) => !value)}
        activeOpacity={0.7}
      >
        <TextComponent style={{ fontSize: 28 }}>{title}</TextComponent>
      </TouchableOpacity>
      {isCollapsed && (
        <Container style={{ marginLeft: 10 }}>
          {data?.map((item, index) => {
            return (
              <InventoryItem
                label={item.label}
                key={`${item.label}-${index}`}
              />
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({});
