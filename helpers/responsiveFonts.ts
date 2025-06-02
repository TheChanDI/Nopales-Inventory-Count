import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 *  The base screen size is taken from iphone 11 Pro Max
 */

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size: number | string, based = "width") {
  if (typeof size === "string") {
    // This converts any '%' sign value in a style to number.
    const filterPercentSign = size.split("%");
    const convertToNumber = Number(filterPercentSign[0]);
    const numValue =
      (convertToNumber / 100) *
      (based === "width" ? SCREEN_WIDTH : SCREEN_HEIGHT);

    const newSize =
      based === "height"
        ? numValue * heightBaseScale
        : numValue * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    const newSize =
      based === "height" ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
//for width  pixel
const widthPixel = (size: any) => {
  return normalize(size, "width");
};
//for height  pixel
const heightPixel = (size: any) => {
  return normalize(size, "height");
};
//for font  pixel
const fontPixel = (size: any) => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: any) => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: any) => {
  return widthPixel(size);
};
export {
  fontPixel,
  heightPixel,
  normalize,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
};
