import Config from "../screens/config";
import { languageType } from "../types/types";

type ConfigScreenProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
};

export default function ConfigScreen({
  currentLanguage,
  handleLanguageChange,
}: ConfigScreenProps) {
  return (
    <Config
      currentLanguage={currentLanguage}
      handleLanguageChange={handleLanguageChange}
    />
  );
}
