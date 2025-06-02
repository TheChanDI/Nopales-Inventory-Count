import React from "react";
import { StyleSheet } from "react-native";
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
  return (
    <Container>
      <TextComponent style={{ fontSize: 18 }}>{title}</TextComponent>
      <Container style={{ marginLeft: 10 }}>
        {data?.map((item, index) => {
          return (
            <Container key={`${item.label}-${index}`}>
              <TextComponent style={{ fontSize: 15 }}>
                {item.label}
              </TextComponent>
              <Container></Container>
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({});
