import { useColorScheme } from "react-native";

import Switch from "../../components/Switch";
import { SubTitle, Text, Title2 } from "../../components/Text";
import Colors from "../../constants/Colors";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import {
  GridItemInner,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../components/GridItemInner";
import { useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";

type ConfigProps = {
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export default function Config({ setTheme }: ConfigProps) {
  const colorScheme = useColorScheme();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(false);
  const { getTheme } = useShoppingListContext();

  const changeTheme = () => {
    setTheme(selectedValueSwitch ? "dark" : "light");
    setSelectedValueSwitch(!selectedValueSwitch);
  };
  return (
    <Container background={Colors[getTheme()].backgroundPrimary}>
      <ContainerInner background={Colors[getTheme()].backgroundPrimary}>
        <GridItemInner
          underlayColor={Colors[getTheme()].itemListBackgroundUnderlay}
          borderColor={Colors[getTheme()].itemListBackgroundBorder}
          background={Colors[getTheme()].itemListBackground}
          height={70}
          row
          elevation={getTheme() === "light"}
        >
          <GridItemWrapperRow height={100}>
            <GridItemWrapperInner width={50} height={100}>
              <Title2 color={Colors[getTheme()].text}>
                {getTheme() === "dark" ? "Dark theme" : "Light theme"}
              </Title2>
            </GridItemWrapperInner>
            <GridItemWrapperInner width={50} height={100}>
              <Switch
                value={selectedValueSwitch}
                label={{ on: "", off: "" }}
                onValueChange={() => changeTheme()}
              />
            </GridItemWrapperInner>
          </GridItemWrapperRow>
        </GridItemInner>
      </ContainerInner>
    </Container>
  );
}
