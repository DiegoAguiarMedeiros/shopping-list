import { ColorList, typeTheme } from "../../../constants/Colors";
import Config from "./index";
import { languageType } from "../../../types/types";

type ConfigScreenProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  currentColor: ColorList;
  handleColorChange: (color: ColorList) => void;
};

export default function ConfigScreen({
  currentLanguage,
  currentColor,
  handleLanguageChange,
  handleColorChange,
}: Readonly<ConfigScreenProps>) {
  return (
    <Config
      currentLanguage={currentLanguage}
      currentColor={currentColor}
      handleColorChange={handleColorChange}
      handleLanguageChange={handleLanguageChange}
    />
  );
}
