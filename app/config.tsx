import { useEffect } from "react";
import { ColorList, colorTheme } from "../constants/Colors";
import { BottomSheetProps } from "../src/components/BottomSheet";
import Config from "../src/screens/config/index";
import { languageType } from "../src/types/types";

type ConfigScreenProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  currentColor: ColorList;
  handleColorChange: (color: ColorList) => void;
  color: colorTheme;
  handleThemeChange: (theme: "light" | "dark") => void;
  currentTheme: "light" | "dark";
  handleChangeRoute: (
    route: "home" | "product" | "tags" | "history" | "config"
  ) => void;
};

export default function ConfigScreen({
  currentLanguage,
  currentColor,
  handleLanguageChange,
  handleColorChange,
  handleThemeChange,
  color,
  currentTheme,
  handleChangeRoute,
}: Readonly<ConfigScreenProps>) {
  useEffect(() => {
    handleChangeRoute("config");
  }, []);
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
