import useStyledHook from "@/hooks/useStyledHook";
import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ViewProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

export const Container: FC<ViewProps> = ({ children, style, ...rest }) => {
  const filterStyle = useStyledHook(style);

  return (
    <View style={filterStyle} {...rest}>
      {children}
    </View>
  );
};
