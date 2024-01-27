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
import * as Styled from "./styles";
import { languageType } from "../../types/types";
import I18n from "i18n-js";
import Select from "../../components/InputSelect";

import currencyArr from "../../constants/Currency";

type ConfigProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
};

interface Image {
  pt: any;
  en: any;
  es: any;
}

const img: Image = {
  pt: require("../../assets/images/flags/pt.png"),
  en: require("../../assets/images/flags/en.png"),
  es: require("../../assets/images/flags/es.png"),
};

const returFlag = (flag: languageType) => {
  if (flag === "pt") return require("../../assets/images/flags/pt.png");
  if (flag === "es") return require("../../assets/images/flags/es.png");
  if (flag === "en") return require("../../assets/images/flags/en.png");
};

type languages = {
  id: number;
  lang: languageType;
};

export default function Config({
  currentLanguage,
  handleLanguageChange,
}: ConfigProps) {
  const colorScheme = useColorScheme();
  const { getTheme, saveTheme, saveLang, saveCurrency, getCurrency } =
    useShoppingListContext();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(
    getTheme() === "dark" ? false : true
  );
  const [currency, setCurrency] = useState(getCurrency());

  const languages: languages[] = [
    {
      id: 1,
      lang: "pt",
    },
    {
      id: 2,
      lang: "en",
    },
    {
      id: 3,
      lang: "es",
    },
  ];

  const changeTheme = () => {
    saveTheme(selectedValueSwitch ? "dark" : "light");
    setSelectedValueSwitch(!selectedValueSwitch);
  };
  const changeLang = (lang: languageType) => {
    saveLang(lang);
    handleLanguageChange(lang);
  };
  const onValueChange = (currency: string, itemIndex: number): void => {
    setCurrency(currency);
    saveCurrency(currency);
  };

  return (
    <Container background={Colors[getTheme()].backgroundPrimary}>
      <ContainerInner background={Colors[getTheme()].backgroundPrimary}>
        <GridItemInner
          underlayColor={Colors[getTheme()].itemListBackgroundUnderlay}
          borderColor={Colors[getTheme()].itemListBackgroundBorder}
          background={Colors[getTheme()].itemListBackground}
          height={400}
          elevation={getTheme() === "light"}
        >
          <>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={Colors[getTheme()].text}>
                  {I18n.t("theme")}
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={50} height={100}>
                <SubTitle color={Colors[getTheme()].text}>
                  {getTheme() === "dark"
                    ? I18n.t("darkTheme")
                    : I18n.t("lightTheme")}
                </SubTitle>
              </GridItemWrapperInner>
              <GridItemWrapperInner width={50} height={100}>
                <Switch
                  value={selectedValueSwitch}
                  label={{ on: "", off: "" }}
                  onValueChange={() => changeTheme()}
                />
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={Colors[getTheme()].text}>
                  {I18n.t("colors")}
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={50} height={100}>
                <SubTitle color={Colors[getTheme()].text}>
                  {getTheme() === "dark" ? "Tema Escuro" : "Tema Claro"}
                </SubTitle>
              </GridItemWrapperInner>
              <GridItemWrapperInner width={50} height={100}>
                <Switch
                  value={selectedValueSwitch}
                  label={{ on: "", off: "" }}
                  onValueChange={() => changeTheme()}
                />
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={20}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={Colors[getTheme()].text}>
                  {I18n.t("language")}
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={20}>
              {languages.map((lang) => (
                <GridItemWrapperInner
                  width={33}
                  height={100}
                  key={`${lang.id}-${lang.lang}`}
                >
                  <Styled.langTouch
                    onPress={() => changeLang(lang.lang)}
                    underlayColor={Colors[getTheme()].secondary}
                    background={
                      currentLanguage === lang.lang
                        ? Colors[getTheme()].primary
                        : Colors[getTheme()].backgroundPrimary
                    }
                  >
                    <Styled.SlideImage source={returFlag(lang.lang)} />
                  </Styled.langTouch>
                </GridItemWrapperInner>
              ))}
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={Colors[getTheme()].text}>
                  {I18n.t("currency")} ({currency})
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <Select
                items={currencyArr.map((currency) => {
                  return {
                    ...currency,
                    name: I18n.t(currency.name),
                  };
                })}
                selectedValue={currency}
                onValueChange={onValueChange}
              />
            </GridItemWrapperRow>
          </>
        </GridItemInner>
      </ContainerInner>
    </Container>
  );
}
