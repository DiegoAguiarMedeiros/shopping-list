

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
import * as Styled from "./styles";
import { languageType } from "../../types/types";
import I18n from "i18n-js";
import Select from "../../components/InputSelect";

import currencyArr from "../../../constants/Currency";
import { ColorList, colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

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

export default function Config() {

  const { ConfigRepository } = useStores();

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
    ConfigRepository.setTheme(ConfigRepository.color.theme === "light" ? "dark" : "light");
  };
  const changeLang = (lang: languageType) => {
    ConfigRepository.setLang(lang);
  };
  const onValueChange = (currency: string, itemIndex: number): void => {
    ConfigRepository.setCurrency(currency);
  };

  const changeColors = (colors: ColorList): void => {
    ConfigRepository.setColors(colors);
  }

  return (
    <Container background={ConfigRepository.color.backgroundPrimary}>
      <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          height={450}
        >
          <>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("theme")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <GridItemWrapperInner width={50} height={100}>
                <SubTitle color={ConfigRepository.color.text}>
                  {ConfigRepository.theme === "dark"
                    ? I18n.t("darkTheme")
                    : I18n.t("lightTheme")}
                </SubTitle>
              </GridItemWrapperInner>
              <GridItemWrapperInner width={50} height={100}>
                <Switch
                  value={ConfigRepository.color.theme === "dark"}
                  label={{ on: "", off: "" }}
                  onValueChange={() => changeTheme()}
                />
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("colors")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              {cores.map((cor) => (
                <GridItemWrapperInner width={33} height={100} key={`${cor}`}>
                  <Styled.langTouch
                    onPress={() => changeColors(cor)}
                    underlayColor={ConfigRepository.color.secondary}
                    background={
                      ConfigRepository.colors === cor
                        ? ConfigRepository.color.primary
                        : ConfigRepository.color.configItemBackground
                    }
                  >
                    <Styled.Color background={cor} />
                  </Styled.langTouch>
                </GridItemWrapperInner>
              ))}
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("language")}</Title2>
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
                    underlayColor={ConfigRepository.color.secondary}
                    background={
                      ConfigRepository.lang === lang.lang
                        ? ConfigRepository.color.primary
                        : ConfigRepository.color.configItemBackground
                    }
                  >
                    <Styled.SlideImage source={returFlag(lang.lang)} />
                  </Styled.langTouch>
                </GridItemWrapperInner>
              ))}
            </GridItemWrapperRow>
            <GridItemWrapperRow height={15}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>
                  {I18n.t("currency")} ({ConfigRepository.currency})
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={10}>
              <Select
                background={ConfigRepository.color.selectCurrency}
                dropdownIconColor={ConfigRepository.color.primary}
                textColor={ConfigRepository.color.textSecondary}
                items={currencyArr.map((currency) => {
                  return {
                    ...currency,
                    name: I18n.t(currency.name),
                  };
                })}
                selectedValue={ConfigRepository.currency}
                onValueChange={onValueChange}
              />
            </GridItemWrapperRow>
          </>
        </GridItemInner>
      </ContainerInner>
    </Container>
  );
}
