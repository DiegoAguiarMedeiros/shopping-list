import { ColorList, colorTheme } from "../constants/Colors";
import Config from "../src/screens/config/index";
import { languageType } from "../types/types";

type ConfigScreenProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  currentColor: ColorList;
  handleColorChange: (color: ColorList) => void;
  color: colorTheme;
  handleThemeChange: (theme: "light" | "dark") => void;
  currentTheme: "light" | "dark";
};

export default function ConfigScreen({
  currentLanguage,
  currentColor,
  handleLanguageChange,
  handleColorChange,
  handleThemeChange,
  color,
  currentTheme,
}: Readonly<ConfigScreenProps>) {
  return (
    <Config
      color={color}
      currentTheme={currentTheme}
      currentLanguage={currentLanguage}
      currentColor={currentColor}
      handleColorChange={handleColorChange}
      handleLanguageChange={handleLanguageChange}
      handleThemeChange={handleThemeChange}
    />
  );
}
