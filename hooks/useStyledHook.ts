import {
  fontPixel,
  normalize,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from "@/helpers/responsiveFonts";

///This method returns a object with styled properties
const returnStyledObject = (style: any) => {
  let obj = {
    paddingHorizontal: pixelSizeHorizontal(style?.paddingHorizontal ?? 0),
    paddingVertical: pixelSizeVertical(style?.paddingVertical ?? 0),
    paddingTop: pixelSizeVertical(style?.paddingTop ?? 0),
    paddingLeft: pixelSizeHorizontal(style?.paddingLeft ?? 0),
    paddingBottom: pixelSizeVertical(style?.paddingBottom ?? 0),
    paddingRight: pixelSizeHorizontal(style?.paddingRight ?? 0),
    padding: normalize(style?.padding ?? 0),
    marginHorizontal: pixelSizeHorizontal(style?.marginHorizontal ?? 0),
    marginVertical: pixelSizeVertical(style?.marginVertical ?? 0),
    marginLeft: pixelSizeHorizontal(style?.marginLeft ?? 0),
    marginRight: pixelSizeHorizontal(style?.marginRight ?? 0),
    marginBottom: pixelSizeVertical(style?.marginBottom ?? 0),
    marginTop: pixelSizeVertical(style?.marginTop ?? 0),
    margin: normalize(style?.margin ?? 0),
    fontSize: fontPixel(style?.fontSize ?? 0),
    lineHeight: fontPixel(style?.lineHeight ?? 0),
    // height: heightPixel(style?.height ?? 0),
    // width: widthPixel(style?.width ?? 0)
  };

  //removing those property whose value is 0
  const asArray = Object.entries(obj);
  const splitArray = asArray.filter((item) => {
    return item[1] !== 0;
  });

  let filteredArray = {};
  if (splitArray.length !== 0) {
    filteredArray = Object.fromEntries(splitArray);
  }

  return filteredArray; //this object contain those properties only whose value is not zero.
};

const useStyledHook = (style: any) => {
  let filterStyle = {};

  const len = style?.length ?? undefined;
  if (len === undefined) {
    //single object only
    filterStyle = {
      ...style,
      ...returnStyledObject(style),
    };
  } else {
    //array of objects
    let arrayObject = {};
    for (let i = 0; i < len; i++) {
      arrayObject = { ...arrayObject, ...style[i] };
    }
    filterStyle = {
      ...arrayObject,
      ...returnStyledObject(arrayObject),
    };
  }

  return filterStyle;
};

export default useStyledHook;
