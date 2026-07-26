

import Switch from "../../components/Switch";
import { SubTitle, Title2 } from "../../components/Text";

import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import {
  GridItemInner,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../components/GridItemInner";
import { useState } from "react";
import * as Styled from "./styles";
import { languageType } from "../../types/types";
import I18n from "i18n-js";
import Select from "../../components/InputSelect";

import currencyArr from "../../../constants/Currency";
import { ColorList } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";
import ColorPicker from "../../components/ColorPicker";

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

  const [customColor, setCustomColor] = useState(ConfigRepository.colors);

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
    setCustomColor(colors);
  }

  const applyCustomColor = () => {
    changeColors(customColor);
  };

  return (
    <Container background={ConfigRepository.color.backgroundPrimary}>
      <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          height={600}
        >
          <>
            <GridItemWrapperRow height={8}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("theme")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={8}>
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
            <GridItemWrapperRow height={12}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("colors")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={9}>
              <GridItemWrapperInner width={65} height={100}>
                <ColorPicker
                  value={customColor}
                  onChange={setCustomColor}
                  background={ConfigRepository.color.backgroundBottomSheet}
                  primary={ConfigRepository.color.primary}
                  buttonText={I18n.t("chooseColor")}
                  doneText={I18n.t("done")}
                />
              </GridItemWrapperInner>
              <GridItemWrapperInner width={35} height={100}>
                <Styled.ApplyColorButton
                  onPress={applyCustomColor}
                  background={ConfigRepository.color.primary}
                  disabledBackground={ConfigRepository.color.switchTrackColorFalse}
                >
                  <Styled.ApplyColorText color={ConfigRepository.color.bottomSheetButtonAddText}>
                    {I18n.t("apply")}
                  </Styled.ApplyColorText>
                </Styled.ApplyColorButton>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={12}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>{I18n.t("language")}</Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={9}>
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
            <GridItemWrapperRow height={12}>
              <GridItemWrapperInner width={100} height={100}>
                <Title2 color={ConfigRepository.color.text}>
                  {I18n.t("currency")} ({ConfigRepository.currency})
                </Title2>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={9}>
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
