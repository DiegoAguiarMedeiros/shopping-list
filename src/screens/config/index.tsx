

import Switch from "../../components/Switch";
import { SubTitle, Title2 } from "../../components/Text";

import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import {
  GridItemInner,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../components/GridItemInner";
import { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import * as Styled from "./styles";
import { languageType } from "../../types/types";
import I18n from "i18n-js";
import Select from "../../components/InputSelect";

import currencyArr from "../../../constants/Currency";
import { ColorList, colorTheme } from "../../../constants/Colors";

type ConfigProps = {
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  currentColor: ColorList;
  handleColorChange: (color: ColorList) => void;
  color: colorTheme;
};

interface Image {
  pt: any;
  en: any;
  es: any;
}

const img: Image = {
  pt: require("../../../assets/images/flags/pt.png"),
  en: require("../../../assets/images/flags/en.png"),
  es: require("../../../assets/images/flags/es.png"),
};

const returFlag = (flag: languageType) => {
  if (flag === "pt") return require("../../../assets/images/flags/pt.png");
  if (flag === "es") return require("../../../assets/images/flags/es.png");
  if (flag === "en") return require("../../../assets/images/flags/en.png");
};

type languages = {
  id: number;
  lang: languageType;
};

export default function Config({
  currentLanguage,
  handleLanguageChange,
  currentColor,
  handleColorChange,
  color,
}: Readonly<ConfigProps>) {
  const { saveTheme, saveLang, saveCurrency, getCurrency } =
    useShoppingListContext();
  const [currentTheme, setCurrentTheme] = useState<colorTheme>(color);
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

  const cores: ColorList[] = ["#43BCAE", "#00BFFF", "#FF69B4"];

  const changeTheme = () => {
    console.log("color.theme", color.theme);
    saveTheme(color.theme === "light" ? "dark" : "light");
  };
  const changeLang = (lang: languageType) => {
    saveLang(lang);
    handleLanguageChange(lang);
  };
  const onValueChange = (currency: string, itemIndex: number): void => {
    setCurrency(currency);
    saveCurrency(currency);
  };
  useEffect(() => {
    setCurrentTheme(color);
  }, [currentColor]);

  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        <GridItemInner
          underlayColor={color.itemListBackgroundUnderlay}
          borderColor={color.itemListBackgroundBorder}
          background={color.itemListBackground}
          height={450}
          elevation={color.theme === "light"}
        >
          <>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={color.text}>{I18n.t("theme")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={50} height={100}>
                <SubTitle color={color.text}>
                  {color.theme === "dark"
                    ? I18n.t("darkTheme")
                    : I18n.t("lightTheme")}
                </SubTitle>
              </GridItemWrapperInner>
              <GridItemWrapperInner width={50} height={100}>
                <Switch
                  color={color}
                  value={color.theme === "dark"}
                  label={{ on: "", off: "" }}
                  onValueChange={() => changeTheme()}
                />
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={color.text}>{I18n.t("colors")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              {cores.map((cor) => (
                <GridItemWrapperInner width={33} height={100} key={`${cor}`}>
                  <Styled.langTouch
                    onPress={() => handleColorChange(cor)}
                    underlayColor={color.secondary}
                    background={
                      currentColor === cor
                        ? color.primary
                        : color.configItemBackground
                    }
                  >
                    <Styled.Color background={cor} />
                  </Styled.langTouch>
                </GridItemWrapperInner>
              ))}
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={color.text}>{I18n.t("language")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              {languages.map((lang) => (
                <GridItemWrapperInner
                  width={33}
                  height={100}
                  key={`${lang.id}-${lang.lang}`}
                >
                  <Styled.langTouch
                    onPress={() => changeLang(lang.lang)}
                    underlayColor={color.secondary}
                    background={
                      currentLanguage === lang.lang
                        ? color.primary
                        : color.configItemBackground
                    }
                  >
                    <Styled.SlideImage source={returFlag(lang.lang)} />
                  </Styled.langTouch>
                </GridItemWrapperInner>
              ))}
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={color.text}>
                  {I18n.t("currency")} ({currency})
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <Select
                color={color}
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
