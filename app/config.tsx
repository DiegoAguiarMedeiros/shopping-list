import { useEffect } from "react";
import { ColorList, colorTheme } from "../constants/Colors";
import { BottomSheetProps } from "../src/components/BottomSheet";
import Config from "../src/screens/config/index";
import { languageType } from "../src/types/types";
import { observer } from "mobx-react-lite";

type ConfigScreenProps = {
  handleChangeRoute: (
    route: "home" | "product" | "tags" | "history" | "config"
  ) => void;
};

const ConfigScreen = ({
  handleChangeRoute,
}: Readonly<ConfigScreenProps>) => {

  useEffect(() => {
    handleChangeRoute("config");
  }, [])
  return <Config />;
};


export default ConfigScreen;