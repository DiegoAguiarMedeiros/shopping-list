import { ColorList, colorTheme, typeTheme } from "../constants/Colors";
import Config from "../src/screens/config/index";
import { languageType } from "../types/types";

type ConfigScreenProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  currentColor: ColorList;
  handleColorChange: (color: ColorList) => void;
  color: colorTheme;
};

export default function ConfigScreen({
  currentLanguage,
  currentColor,
  handleLanguageChange,
  handleColorChange,
  color,
}: Readonly<ConfigScreenProps>) {
  return (
    <Config
      color={color}
      currentLanguage={currentLanguage}
      currentColor={currentColor}
      handleColorChange={handleColorChange}
      handleLanguageChange={handleLanguageChange}
    />
  );
}
