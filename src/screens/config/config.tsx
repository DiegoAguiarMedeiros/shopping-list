import { ColorList, typeTheme } from "../../../constants/Colors";
import Config from "../screens/config";
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
}: ConfigScreenProps) {
  return (
    <Config
      currentLanguage={currentLanguage}
      currentColor={currentColor}
      handleColorChange={handleColorChange}
      handleLanguageChange={handleLanguageChange}
    />
  );
}
