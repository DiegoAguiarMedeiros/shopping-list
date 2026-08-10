export type colorTheme = {
  theme: "auto" | "inverted" | "light" | "dark";
  primary: string; primaryStrong: string; onPrimary: string; onPrimaryStrong: string; secondary: string; tertiary: string; white: string; whiteLighter: string; black: string;
  warning: string; alert: string; info: string; text: string; textSecondary: string; textTertiary: string;
  backgroundPrimary: string; backgroundSecondary: string; backgroundTertiary: string;
  menuButtonColor: string; menuButtonActiveColor: string; backgroundBottomSheet: string; backgroundBottomNavigation: string;
  bottomSheetButtonAddBackground: string; bottomSheetButtonCancelBackground: string; bottomSheetButtonAddBorder: string; bottomSheetButtonCancelBorder: string;
  bottomSheetButtonAddText: string; bottomSheetButtonCancelText: string; bottomSheetButtonAddUnderlay: string; bottomSheetButtonCancelUnderlay: string;
  itemListBackground: string; itemListBackgroundUnderlay: string; itemListBackgroundBorder: string; itemListText: string; itemListIcon: string; itemListIconFilled: string; itemListTextSecondary: string;
  itemListItemOpenBackground: string; itemListItemOpenBackgroundUnderlay: string; itemListItemOpenBackgroundBorder: string; itemListItemOpenText: string; itemListItemOpenTextSecondary: string;
  itemListItemOpenButtonBorder: string; itemListItemOpenButtonBackGround: string; itemListItemOpenIcon: string; itemListItemOpenIconFilled: string; itemListItemOpenButtonText: string;
  itemListItemOpenButtonSendBorder: string; itemListItemOpenButtonSendBackGround: string; itemListItemOpenButtonSendText: string; itemListItemOpenTrashIcon: string;
  swipeIcon: string; swipeIconUnderlay: string; circularItemBackground: string; circularItemText: string; circularItemFilled: string; circularHeaderBackground: string; circularHeaderText: string; circularHeaderFilled: string;
  filterButtonBackground: string; filterButtonBorder: string; filterButtonText: string; filterButtonActiveBackground: string; filterButtonActiveBorder: string; filterButtonActiveText: string;
  itemProductListAveragePrice: string; itemProductListLastPriceButtonBorder: string; itemProductListLastPriceButtonText: string; configItemBackground: string;
  switchTrackColorTrue: string; switchTrackColorFalse: string; switchThumbColorTrue: string; switchThumbColorFalse: string;
  selectCurrency: string; selectProduct: string; selectCategory: string;
};

export type typeTheme = { light: colorTheme; dark: colorTheme };
export type ColorList = string;

export const DEFAULT_ACCENT_COLOR = "#605DE5";

export const normalizeHexColor = (value: string): string | null => {
  const hex = value.trim().replace(/^#/, "");
  return /^[0-9a-fA-F]{6}$/.test(hex) ? `#${hex.toUpperCase()}` : null;
};

const alpha = (color: string, value: string) => `${color}${value}`;

type RgbColor = { red: number; green: number; blue: number };

const parseHexColor = (color: string): RgbColor | null => {
  const value = color.trim().replace(/^#/, "");
  const hex = value.length === 3
    ? value.split("").map((channel) => channel + channel).join("")
    : value.slice(0, 6);

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;

  return {
    red: parseInt(hex.slice(0, 2), 16),
    green: parseInt(hex.slice(2, 4), 16),
    blue: parseInt(hex.slice(4, 6), 16),
  };
};

const getRelativeLuminance = ({ red, green, blue }: RgbColor) => {
  const linearize = (channel: number) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };

  return linearize(red) * 0.2126 + linearize(green) * 0.7152 + linearize(blue) * 0.0722;
};

const toHex = (value: number) => Math.round(value).toString(16).padStart(2, "0");

/** Creates a stronger shade that is always readable with a light icon. */
const getStrongPrimary = (color: string): string => {
  const parsed = parseHexColor(color);
  if (!parsed) return color;

  for (let factor = 1; factor >= 0; factor -= 0.02) {
    const stronger = `#${toHex(parsed.red * factor)}${toHex(parsed.green * factor)}${toHex(parsed.blue * factor)}`;
    if (getContrastRatio("#FFF", stronger) >= 4.5) return stronger.toUpperCase();
  }

  return "#000000";
};

/** Returns the WCAG contrast ratio between two hexadecimal colors. */
export const getContrastRatio = (first: string, second: string): number => {
  const firstColor = parseHexColor(first);
  const secondColor = parseHexColor(second);
  if (!firstColor || !secondColor) return 0;

  const firstLuminance = getRelativeLuminance(firstColor);
  const secondLuminance = getRelativeLuminance(secondColor);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

/** Selects black or white, whichever has the greatest contrast with the background. */
export const getContrastColor = (background: string): "#000" | "#FFF" => {
  return getContrastRatio("#000", background) >= getContrastRatio("#FFF", background)
    ? "#000"
    : "#FFF";
};

/**
 * Keeps the preferred color when it is accessible; otherwise returns black or
 * white. This makes controls readable even when the user picks a very light
 * or very dark accent color.
 */
export const ensureContrast = (foreground: string, background: string, minimumRatio = 3): string => {
  return getContrastRatio(foreground, background) >= minimumRatio
    ? foreground
    : getContrastColor(background);
};

const contrastText = (color: string) => getContrastColor(color);

const createTheme = (accent: string, theme: "light" | "dark"): colorTheme => {
  const dark = theme === "dark";
  const foreground = dark ? "#FFF" : "#000";
  const surface = dark ? "#4F4E4E" : "#FFF";
  const base = dark ? "#1E1E1E" : "#FFF";
  const muted = dark ? "#FFFFFF88" : "#00000098";
  const buttonText = contrastText(accent);
  const primaryStrong = getStrongPrimary(accent);
  const bottomNavigation = dark ? "#2E2E2E" : "#EEE";

  return {
    theme, primary: accent, primaryStrong, onPrimary: buttonText, onPrimaryStrong: "#FFF", secondary: alpha(accent, "50"), tertiary: dark ? "#5F5E5E" : "#F0F8FF",
    white: "#FFF", whiteLighter: "#FFFFFF80", black: "#000", warning: "#ffcc00", alert: "#D85D63", info: "#2F6F9F",
    text: foreground, textSecondary: muted, textTertiary: dark ? "#FFFFFF68" : "#00000078",
    backgroundPrimary: base, backgroundSecondary: dark ? "#4F4E4E" : accent, backgroundTertiary: dark ? "#5F5E5E" : "#F0F8FF",
    menuButtonColor: dark ? "#FFFFFF50" : "#00000050", menuButtonActiveColor: ensureContrast(accent, bottomNavigation),
    backgroundBottomSheet: dark ? "#2E2E2E" : "#EEE", backgroundBottomNavigation: bottomNavigation,
    bottomSheetButtonAddBackground: accent, bottomSheetButtonCancelBackground: dark ? "#4F4E4E" : "#AAA",
    bottomSheetButtonAddBorder: accent, bottomSheetButtonCancelBorder: dark ? "#4F4E4E" : "#AAA",
    bottomSheetButtonAddText: buttonText, bottomSheetButtonCancelText: foreground,
    bottomSheetButtonAddUnderlay: alpha(accent, "50"), bottomSheetButtonCancelUnderlay: dark ? "#4F4E4E50" : "#AAAAAA50",
    itemListBackground: surface, itemListBackgroundUnderlay: dark ? "#4F4E4E90" : "#EEE", itemListBackgroundBorder: dark ? "#4F4E4E" : "#EEE",
    itemListText: foreground, itemListIcon: dark ? "#1E1E1E" : "#00000050", itemListIconFilled: accent, itemListTextSecondary: dark ? "#FFFFFF88" : "#00000050",
    itemListItemOpenBackground: dark ? "#4F4E4E" : "#EEE", itemListItemOpenBackgroundUnderlay: alpha(accent, dark ? "FF" : "90"), itemListItemOpenBackgroundBorder: dark ? "#4F4E4E" : "#EEE",
    itemListItemOpenText: foreground, itemListItemOpenTextSecondary: dark ? "#FFFFFF88" : "#00000050",
    itemListItemOpenButtonBorder: accent, itemListItemOpenButtonBackGround: accent, itemListItemOpenIcon: dark ? "#1E1E1E" : "#00000050", itemListItemOpenIconFilled: accent,
    itemListItemOpenButtonText: buttonText, itemListItemOpenButtonSendBorder: accent, itemListItemOpenButtonSendBackGround: accent, itemListItemOpenButtonSendText: buttonText, itemListItemOpenTrashIcon: dark ? "#FFF" : accent,
    swipeIcon: dark ? "#9e9696" : "#00000050", swipeIconUnderlay: dark ? "#4F4E4E" : "#EEE",
    circularItemBackground: surface, circularItemText: dark ? accent : "#00000050", circularItemFilled: accent, circularHeaderBackground: accent, circularHeaderText: buttonText, circularHeaderFilled: buttonText,
    filterButtonBackground: dark ? "#1E1E1E" : "#EEE", filterButtonBorder: dark ? "#1E1E1E" : "#EEE", filterButtonText: dark ? "#FFF" : "#00000080", filterButtonActiveBackground: accent, filterButtonActiveBorder: accent, filterButtonActiveText: buttonText,
    itemProductListAveragePrice: accent, itemProductListLastPriceButtonBorder: accent, itemProductListLastPriceButtonText: dark ? foreground : accent,
    configItemBackground: base, switchTrackColorTrue: alpha(buttonText, "88"), switchTrackColorFalse: dark ? "#5F5E5E" : "#CCC", switchThumbColorTrue: accent, switchThumbColorFalse: accent,
    selectCurrency: dark ? "#4F4E4E" : "#EEE", selectProduct: base, selectCategory: base,
  };
};

/** Generates the complete color system directly from the currently selected accent. */
export const Colors = (selectedColor: string): typeTheme => {
  const accent = normalizeHexColor(selectedColor) ?? DEFAULT_ACCENT_COLOR;
  return { light: createTheme(accent, "light"), dark: createTheme(accent, "dark") };
};

export const getColorTheme = (selectedColor: string, theme: "light" | "dark"): colorTheme => Colors(selectedColor)[theme];
