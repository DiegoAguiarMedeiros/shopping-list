const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const primary = "#43BCAE";
const secondary = "#69C9BE";
const tertiary = "#43BC72";

const primaryDarkColor = "#1E1E1E";
const secondaryDarkColor = "#4F4E4E";
const tertiaryDarkColor = "#5F5E5E";

const primaryDarkFontColor = "#fff";
const secondaryDarkFontColor = "#ffffff88";
const tertiaryDarkFontColor = "#ffffff78";

const primaryLightColor = "#FFFFFF";
const secondaryLightColor = "#F5F5F5";
const tertiaryLightColor = "#F0F8FF";

const white = "#fff";
const black = "#000";
const alert = "#d85d63";
const warning = "#fff";
const info = "#2f6f9f";
const primaryTitleLightFontColor = "#ffffff";
const primaryLightFontColor = "#000000";
const secondaryLightFontColor = "#00000088";
const tertiaryLightFontColor = "#00000078";

export type colorTheme = {
  theme: string;
  primary: string;
  secondary: string;
  tertiary: string;
  white: string;
  whiteLighter: string;
  black: string;
  warning: string;
  alert: string;
  info: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  menuButtonColor: string;
  menuButtonActiveColor: string;
  backgroundBottomSheet: string;
  bottomSheetButtonAddBackground: string;
  bottomSheetButtonCancelBackground: string;
  bottomSheetButtonAddBorder: string;
  bottomSheetButtonCancelBorder: string;
  bottomSheetButtonAddText: string;
  bottomSheetButtonCancelText: string;
  bottomSheetButtonAddUnderlay: string;
  bottomSheetButtonCancelUnderlay: string;
  itemListBackground: string;
  itemListBackgroundUnderlay: string;
  itemListBackgroundBorder: string;
  itemListText: string;
  itemListIcon: string;
  itemListIconFilled: string;
  itemListTextSecondary: string;
  itemListItemOpenBackground: string;
  itemListItemOpenBackgroundUnderlay: string;
  itemListItemOpenBackgroundBorder: string;
  itemListItemOpenText: string;
  itemListItemOpenTextSecondary: string;
  itemListItemOpenButtonBorder: string;
  itemListItemOpenButtonBackGround: string;
  itemListItemOpenIcon: string;
  itemListItemOpenIconFilled: string;
  itemListItemOpenButtonText: string;
  itemListItemOpenButtonSendBorder: string;
  itemListItemOpenButtonSendBackGround: string;
  itemListItemOpenButtonSendText: string;
  itemListItemOpenTrashIcon: string;
  swipeIcon: string;
  swipeIconUnderlay: string;
  circularItemBackground: string;
  circularItemText: string;
  circularItemFilled: string;
  circularHeaderBackground: string;
  circularHeaderText: string;
  circularHeaderFilled: string;
  filterButtonBackground: string;
  filterButtonBorder: string;
  filterButtonText: string;
  filterButtonActiveBackground: string;
  filterButtonActiveBorder: string;
  filterButtonActiveText: string;
  itemProductListAveragePrice: string;
  itemProductListLastPriceButtonBorder: string;
  itemProductListLastPriceButtonText: string;
  configItemBackground: string;
  switchTrackColorTrue: string;
  switchTrackColorFalse: string;
  switchThumbColorTrue: string;
  switchThumbColorFalse: string;
  selectCurrency: string;
  selectProduct: string;
  selectCategory: string;
};

export type typeTheme = {
  light: colorTheme;
  dark: colorTheme;
};

export type ColorList = "#43BCAE" | "#00BFFF" | "#FF69B4";

export type colors = {
  "#43BCAE": typeTheme;
  "#00BFFF": typeTheme;
  "#FF69B4": typeTheme;
};

export const Colors: colors = {
  "#43BCAE": {
    light: {
      theme: "light",
      primary: "#43BCAE",
      secondary: "#43BCAE50",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#000",
      textSecondary: "#00000098",
      textTertiary: "#00000088",
      backgroundPrimary: "#FFF",
      backgroundSecondary: "#69C9BE",
      backgroundTertiary: "#438EBC",
      menuButtonColor: "#00000050",
      menuButtonActiveColor: "#43BCAE",
      backgroundBottomSheet: "#eee",
      bottomSheetButtonAddBackground: "#43BCAE",
      bottomSheetButtonCancelBackground: "#aaa",
      bottomSheetButtonAddBorder: "#43BCAE",
      bottomSheetButtonCancelBorder: "#aaa",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#43BCAE50",
      bottomSheetButtonCancelUnderlay: "#aaaaaa50",
      itemListBackground: "#FFF",
      itemListBackgroundUnderlay: "#eee",
      itemListBackgroundBorder: "#eee",
      itemListText: "#000",
      itemListIcon: "#00000050",
      itemListIconFilled: "#43BCAE",
      itemListTextSecondary: "#00000050",
      itemListItemOpenBackground: "#eeeeee",
      itemListItemOpenBackgroundUnderlay: "#69C9BE90",
      itemListItemOpenBackgroundBorder: "#eeeeee",
      itemListItemOpenText: "#000",
      itemListItemOpenTextSecondary: "#00000050",
      itemListItemOpenButtonBorder: "#43BCAE",
      itemListItemOpenButtonBackGround: "#43BCAE",
      itemListItemOpenIcon: "#00000050",
      itemListItemOpenIconFilled: "#43BCAE",
      itemListItemOpenButtonText: "#fff",
      itemListItemOpenButtonSendBorder: "#43BCAE",
      itemListItemOpenButtonSendBackGround: "#43BCAE",
      itemListItemOpenButtonSendText: "#fff",
      itemListItemOpenTrashIcon: "#43BCAE",
      swipeIcon: "#00000050",
      swipeIconUnderlay: "#eee",
      circularItemBackground: "#fff",
      circularItemText: "#00000050",
      circularItemFilled: "#43BCAE",
      circularHeaderBackground: "#69C9BE",
      circularHeaderText: "#eee",
      circularHeaderFilled: "#43BCAE",
      filterButtonBackground: "#eeeeee",
      filterButtonBorder: "#eeeeee",
      filterButtonText: "#00000080",
      filterButtonActiveBackground: "#43BCAE",
      filterButtonActiveBorder: "#43BCAE",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#43BCAE",
      itemProductListLastPriceButtonBorder: "#43BCAE",
      itemProductListLastPriceButtonText: "#43BCAE",
      configItemBackground: "#FFF",
      switchTrackColorTrue: "#43BCAE88",
      switchTrackColorFalse: "#CCC",
      switchThumbColorTrue: "#43BCAE",
      switchThumbColorFalse: "#43BCAE",
      selectCurrency: "#eee",
      selectProduct: "#FFF",
      selectCategory: "#FFF",
    },
    dark: {
      theme: "dark",
      primary: "#43BCAE",
      secondary: "#43BCAE50",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#fff",
      textSecondary: "#ffffff88",
      textTertiary: "#ffffff68",
      backgroundPrimary: "#1E1E1E",
      backgroundSecondary: "#4F4E4E",
      backgroundTertiary: "#5F5E5E",
      menuButtonColor: "#ffffff50",
      menuButtonActiveColor: "#43BCAE",
      backgroundBottomSheet: "#2E2E2E",
      bottomSheetButtonAddBackground: "#43BCAE",
      bottomSheetButtonCancelBackground: "#4F4E4E",
      bottomSheetButtonAddBorder: "#43BCAE",
      bottomSheetButtonCancelBorder: "#4F4E4E",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#43BCAE50",
      bottomSheetButtonCancelUnderlay: "#4F4E4E50",
      itemListBackground: "#4F4E4E",
      itemListBackgroundUnderlay: "#4F4E4E90",
      itemListBackgroundBorder: "#4F4E4E",
      itemListText: primaryDarkFontColor,
      itemListIcon: "#1E1E1E",
      itemListIconFilled: "#43BCAE",
      itemListTextSecondary: secondaryDarkFontColor,
      itemListItemOpenBackground: "#4F4E4E",
      itemListItemOpenBackgroundUnderlay: "#43BCAE",
      itemListItemOpenBackgroundBorder: "#4F4E4E",
      itemListItemOpenIcon: "#1E1E1E",
      itemListItemOpenIconFilled: "#43BCAE",
      itemListItemOpenText: primaryDarkFontColor,
      itemListItemOpenTextSecondary: secondaryDarkFontColor,
      itemListItemOpenButtonBorder: "#43BCAE",
      itemListItemOpenButtonBackGround: "#43BCAE",
      itemListItemOpenButtonText: primaryDarkFontColor,
      itemListItemOpenButtonSendBorder: "#43BCAE",
      itemListItemOpenButtonSendBackGround: "#43BCAE",
      itemListItemOpenButtonSendText: primaryDarkFontColor,
      itemListItemOpenTrashIcon: white,
      swipeIcon: primaryDarkFontColor,
      swipeIconUnderlay: "#4F4E4E",
      circularItemBackground: "#4F4E4E",
      circularItemText: "#43BCAE",
      circularItemFilled: "#43BCAE",
      circularHeaderBackground: "#43BCAE",
      circularHeaderText: secondaryDarkFontColor,
      circularHeaderFilled: "#43BCAE",
      filterButtonBackground: primaryDarkColor,
      filterButtonBorder: primaryDarkColor,
      filterButtonText: primaryDarkFontColor,
      filterButtonActiveBackground: "#4F4E4E",
      filterButtonActiveBorder: "#4F4E4E",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#43BCAE",
      itemProductListLastPriceButtonBorder: "#43BCAE",
      itemProductListLastPriceButtonText: primaryDarkFontColor,
      configItemBackground: "#4F4E4E",
      switchTrackColorTrue: "#43BCAE88",
      switchTrackColorFalse: "#5F5E5E",
      switchThumbColorTrue: "#43BCAE",
      switchThumbColorFalse: "#43BCAE",
      selectCurrency: "#1E1E1E",
      selectProduct: "#1E1E1E",
      selectCategory: "#1E1E1E",
    },
  },
  "#00BFFF": {
    light: {
      theme: "light",
      primary: "#00BFFF",
      secondary: "#00BFFF50",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#000",
      textSecondary: "#00000098",
      textTertiary: "#00000088",
      backgroundPrimary: "#FFF",
      backgroundSecondary: "#00BFFF",
      backgroundTertiary: "#438EBC",
      menuButtonColor: "#00000050",
      menuButtonActiveColor: "#00BFFF",
      backgroundBottomSheet: "#eee",
      bottomSheetButtonAddBackground: "#00BFFF",
      bottomSheetButtonCancelBackground: "#aaa",
      bottomSheetButtonAddBorder: "#00BFFF",
      bottomSheetButtonCancelBorder: "#aaa",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#00BFFF50",
      bottomSheetButtonCancelUnderlay: "#aaaaaa50",
      itemListBackground: "#FFF",
      itemListBackgroundUnderlay: "#eee",
      itemListBackgroundBorder: "#eee",
      itemListText: "#000",
      itemListIcon: "#00000050",
      itemListIconFilled: "#00BFFF",
      itemListTextSecondary: "#00000050",
      itemListItemOpenBackground: "#eeeeee",
      itemListItemOpenBackgroundUnderlay: "#00BFFF90",
      itemListItemOpenBackgroundBorder: "#eeeeee",
      itemListItemOpenText: "#000",
      itemListItemOpenTextSecondary: "#00000050",
      itemListItemOpenButtonBorder: "#00BFFF",
      itemListItemOpenButtonBackGround: "#00BFFF",
      itemListItemOpenIcon: "#00000050",
      itemListItemOpenIconFilled: "#00BFFF",
      itemListItemOpenButtonText: "#fff",
      itemListItemOpenButtonSendBorder: "#00BFFF",
      itemListItemOpenButtonSendBackGround: "#00BFFF",
      itemListItemOpenButtonSendText: "#fff",
      itemListItemOpenTrashIcon: "#00BFFF",
      swipeIcon: "#00000050",
      swipeIconUnderlay: "#eee",
      circularItemBackground: "#fff",
      circularItemText: "#00000050",
      circularItemFilled: "#00BFFF",
      circularHeaderBackground: "#00BFFF",
      circularHeaderText: "#eee",
      circularHeaderFilled: "#00BFFF",
      filterButtonBackground: "#eeeeee",
      filterButtonBorder: "#eeeeee",
      filterButtonText: "#00000080",
      filterButtonActiveBackground: "#00BFFF",
      filterButtonActiveBorder: "#00BFFF",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#00BFFF",
      itemProductListLastPriceButtonBorder: "#00BFFF",
      itemProductListLastPriceButtonText: "#00BFFF",
      configItemBackground: "#FFF",
      switchTrackColorTrue: "#00BFFF88",
      switchTrackColorFalse: "#CCC",
      switchThumbColorTrue: "#00BFFF",
      switchThumbColorFalse: "#00BFFF",
      selectCurrency: "#eee",
      selectProduct: "#FFF",
      selectCategory: "#FFF",
    },
    dark: {
      theme: "dark",
      primary: "#00BFFF",
      secondary: "#00BFFF50",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#fff",
      textSecondary: "#ffffff88",
      textTertiary: "#ffffff68",
      backgroundPrimary: "#1E1E1E",
      backgroundSecondary: "#4F4E4E",
      backgroundTertiary: "#5F5E5E",
      menuButtonColor: "#ffffff50",
      menuButtonActiveColor: "#00BFFF",
      backgroundBottomSheet: "#2E2E2E",
      bottomSheetButtonAddBackground: "#00BFFF",
      bottomSheetButtonCancelBackground: "#4F4E4E",
      bottomSheetButtonAddBorder: "#00BFFF",
      bottomSheetButtonCancelBorder: "#4F4E4E",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#00BFFF50",
      bottomSheetButtonCancelUnderlay: "#4F4E4E50",
      itemListBackground: "#4F4E4E",
      itemListBackgroundUnderlay: "#4F4E4E90",
      itemListBackgroundBorder: "#4F4E4E",
      itemListText: primaryDarkFontColor,
      itemListIcon: "#1E1E1E",
      itemListIconFilled: "#00BFFF",
      itemListTextSecondary: secondaryDarkFontColor,
      itemListItemOpenBackground: "#4F4E4E",
      itemListItemOpenBackgroundUnderlay: "#00BFFF",
      itemListItemOpenBackgroundBorder: "#4F4E4E",
      itemListItemOpenIcon: "#1E1E1E",
      itemListItemOpenIconFilled: "#00BFFF",
      itemListItemOpenText: primaryDarkFontColor,
      itemListItemOpenTextSecondary: secondaryDarkFontColor,
      itemListItemOpenButtonBorder: "#00BFFF",
      itemListItemOpenButtonBackGround: "#00BFFF",
      itemListItemOpenButtonText: primaryDarkFontColor,
      itemListItemOpenButtonSendBorder: "#00BFFF",
      itemListItemOpenButtonSendBackGround: "#00BFFF",
      itemListItemOpenButtonSendText: primaryDarkFontColor,
      itemListItemOpenTrashIcon: white,
      swipeIcon: primaryDarkFontColor,
      swipeIconUnderlay: "#4F4E4E",
      circularItemBackground: "#4F4E4E",
      circularItemText: "#00BFFF",
      circularItemFilled: "#00BFFF",
      circularHeaderBackground: "#00BFFF",
      circularHeaderText: secondaryDarkFontColor,
      circularHeaderFilled: "#00BFFF",
      filterButtonBackground: primaryDarkColor,
      filterButtonBorder: primaryDarkColor,
      filterButtonText: primaryDarkFontColor,
      filterButtonActiveBackground: "#4F4E4E",
      filterButtonActiveBorder: "#4F4E4E",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#00BFFF",
      itemProductListLastPriceButtonBorder: "#00BFFF",
      itemProductListLastPriceButtonText: primaryDarkFontColor,
      configItemBackground: "#4F4E4E",
      switchTrackColorTrue: "#00BFFF88",
      switchTrackColorFalse: "#5F5E5E",
      switchThumbColorTrue: "#00BFFF",
      switchThumbColorFalse: "#00BFFF",
      selectCurrency: "#1E1E1E",
      selectProduct: "#1E1E1E",
      selectCategory: "#1E1E1E",
    },
  },
  "#FF69B4": {
    light: {
      theme: "light",
      primary: "#FF69B4",
      secondary: "#FF69B450",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#000",
      textSecondary: "#00000098",
      textTertiary: "#00000088",
      backgroundPrimary: "#FFF",
      backgroundSecondary: "#FF69B4",
      backgroundTertiary: "#438EBC",
      menuButtonColor: "#00000050",
      menuButtonActiveColor: "#FF69B4",
      backgroundBottomSheet: "#eee",
      bottomSheetButtonAddBackground: "#FF69B4",
      bottomSheetButtonCancelBackground: "#aaa",
      bottomSheetButtonAddBorder: "#FF69B4",
      bottomSheetButtonCancelBorder: "#aaa",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#FF69B450",
      bottomSheetButtonCancelUnderlay: "#aaaaaa50",
      itemListBackground: "#FFF",
      itemListBackgroundUnderlay: "#eee",
      itemListBackgroundBorder: "#eee",
      itemListText: "#000",
      itemListIcon: "#00000050",
      itemListIconFilled: "#FF69B4",
      itemListTextSecondary: "#00000050",
      itemListItemOpenBackground: "#eeeeee",
      itemListItemOpenBackgroundUnderlay: "#FF69B490",
      itemListItemOpenBackgroundBorder: "#eeeeee",
      itemListItemOpenText: "#000",
      itemListItemOpenTextSecondary: "#00000050",
      itemListItemOpenButtonBorder: "#FF69B4",
      itemListItemOpenButtonBackGround: "#FF69B4",
      itemListItemOpenIcon: "#00000050",
      itemListItemOpenIconFilled: "#FF69B4",
      itemListItemOpenButtonText: "#fff",
      itemListItemOpenButtonSendBorder: "#FF69B4",
      itemListItemOpenButtonSendBackGround: "#FF69B4",
      itemListItemOpenButtonSendText: "#fff",
      itemListItemOpenTrashIcon: "#FF69B4",
      swipeIcon: "#00000050",
      swipeIconUnderlay: "#eee",
      circularItemBackground: "#fff",
      circularItemText: "#00000050",
      circularItemFilled: "#FF69B4",
      circularHeaderBackground: "#FF69B4",
      circularHeaderText: "#eee",
      circularHeaderFilled: "#FF69B4",
      filterButtonBackground: "#eeeeee",
      filterButtonBorder: "#eeeeee",
      filterButtonText: "#00000080",
      filterButtonActiveBackground: "#FF69B4",
      filterButtonActiveBorder: "#FF69B4",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#FF69B4",
      itemProductListLastPriceButtonBorder: "#FF69B4",
      itemProductListLastPriceButtonText: "#FF69B4",
      configItemBackground: "#FFF",
      switchTrackColorTrue: "#FF69B488",
      switchTrackColorFalse: "#CCC",
      switchThumbColorTrue: "#FF69B4",
      switchThumbColorFalse: "#FF69B4",
      selectCurrency: "#eee",
      selectProduct: "#FFF",
      selectCategory: "#FFF",
    },
    dark: {
      theme: "dark",
      primary: "#FF69B4",
      secondary: "#FF69B450",
      tertiary,
      white,
      whiteLighter: "#ffffff80",
      black,
      warning,
      alert,
      info,
      text: "#fff",
      textSecondary: "#ffffff88",
      textTertiary: "#ffffff68",
      backgroundPrimary: "#1E1E1E",
      backgroundSecondary: "#4F4E4E",
      backgroundTertiary: "#5F5E5E",
      menuButtonColor: "#ffffff50",
      menuButtonActiveColor: "#FF69B4",
      backgroundBottomSheet: "#2E2E2E",
      bottomSheetButtonAddBackground: "#FF69B4",
      bottomSheetButtonCancelBackground: "#4F4E4E",
      bottomSheetButtonAddBorder: "#FF69B4",
      bottomSheetButtonCancelBorder: "#4F4E4E",
      bottomSheetButtonAddText: primaryDarkFontColor,
      bottomSheetButtonCancelText: primaryDarkFontColor,
      bottomSheetButtonAddUnderlay: "#FF69B450",
      bottomSheetButtonCancelUnderlay: "#4F4E4E50",
      itemListBackground: "#4F4E4E",
      itemListBackgroundUnderlay: "#4F4E4E90",
      itemListBackgroundBorder: "#4F4E4E",
      itemListText: primaryDarkFontColor,
      itemListIcon: "#1E1E1E",
      itemListIconFilled: "#FF69B4",
      itemListTextSecondary: secondaryDarkFontColor,
      itemListItemOpenBackground: "#4F4E4E",
      itemListItemOpenBackgroundUnderlay: "#FF69B4",
      itemListItemOpenBackgroundBorder: "#4F4E4E",
      itemListItemOpenIcon: "#1E1E1E",
      itemListItemOpenIconFilled: "#FF69B4",
      itemListItemOpenText: primaryDarkFontColor,
      itemListItemOpenTextSecondary: secondaryDarkFontColor,
      itemListItemOpenButtonBorder: "#FF69B4",
      itemListItemOpenButtonBackGround: "#FF69B4",
      itemListItemOpenButtonText: primaryDarkFontColor,
      itemListItemOpenButtonSendBorder: "#FF69B4",
      itemListItemOpenButtonSendBackGround: "#FF69B4",
      itemListItemOpenButtonSendText: primaryDarkFontColor,
      itemListItemOpenTrashIcon: white,
      swipeIcon: primaryDarkFontColor,
      swipeIconUnderlay: "#4F4E4E",
      circularItemBackground: "#4F4E4E",
      circularItemText: "#FF69B4",
      circularItemFilled: "#FF69B4",
      circularHeaderBackground: "#FF69B4",
      circularHeaderText: secondaryDarkFontColor,
      circularHeaderFilled: "#FF69B4",
      filterButtonBackground: primaryDarkColor,
      filterButtonBorder: primaryDarkColor,
      filterButtonText: primaryDarkFontColor,
      filterButtonActiveBackground: "#4F4E4E",
      filterButtonActiveBorder: "#4F4E4E",
      filterButtonActiveText: primaryDarkFontColor,
      itemProductListAveragePrice: "#FF69B4",
      itemProductListLastPriceButtonBorder: "#FF69B4",
      itemProductListLastPriceButtonText: primaryDarkFontColor,
      configItemBackground: "#4F4E4E",
      switchTrackColorTrue: "#FF69B488",
      switchTrackColorFalse: "#5F5E5E",
      switchThumbColorTrue: "#FF69B4",
      switchThumbColorFalse: "#FF69B4",
      selectCurrency: "#1E1E1E",
      selectProduct: "#1E1E1E",
      selectCategory: "#1E1E1E",
    },
  },
};
