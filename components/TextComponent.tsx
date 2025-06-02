import { fontPixel } from "@/helpers/responsiveFonts";
import useStyledHook from "@/hooks/useStyledHook";
import { Fonts } from "@/theme/fonts";
import { LARGE_FONT_SIZE } from "@/utils/scalingUtils";
import React from "react";
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from "react-native";

interface ITextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const TextComponent = ({ children, style }: ITextProps) => {
  const filterdStyled = useStyledHook(style);
  return <RNText style={[styles.baseStyle, filterdStyled]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  baseStyle: {
    fontSize: fontPixel(LARGE_FONT_SIZE),
    lineHeight: fontPixel(33),
    fontFamily: Fonts.bold_font,
  },
});
