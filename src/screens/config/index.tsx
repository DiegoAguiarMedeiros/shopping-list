
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image as ImageRN } from "react-native";
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



  return (
    <Container background={ConfigRepository.color.backgroundPrimary}>
      <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="100%" >
            <Title2 color={ConfigRepository.color.text}>{I18n.t("theme")}</Title2>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="50%">
            <SubTitle color={ConfigRepository.color.text}>
              {ConfigRepository.theme === "dark"
                ? I18n.t("darkTheme")
                : I18n.t("lightTheme")}
            </SubTitle>
          </GridItemWrapperInner>
          <GridItemWrapperInner width="50%">
            <Switch
              value={ConfigRepository.color.theme === "dark"}
              label={{ on: "", off: "" }}
              onValueChange={() => changeTheme()}
            />
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="100%">
            <Title2 color={ConfigRepository.color.text}>{I18n.t("colors")}</Title2>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="65%">
            <ColorPicker
              value={customColor}
              onChange={changeColors}
              background={ConfigRepository.color.backgroundBottomSheet}
              primary={ConfigRepository.color.primary}
              onPrimary={ConfigRepository.color.onPrimary}
              buttonText={I18n.t("chooseColor")}
              doneText={I18n.t("done")}
            />
          </GridItemWrapperInner>         
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="100%">
            <Title2 color={ConfigRepository.color.text}>{I18n.t("language")}</Title2>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          {languages.map((lang) => (
            <GridItemWrapperInner
              width="33%"
              key={`${lang.id}-${lang.lang}`}
            >
              <TouchableHighlight
                style={styles.langTouch}
                onPress={() => changeLang(lang.lang)}
                underlayColor="transparent"
              >
                <ImageRN
                  source={returFlag(lang.lang)}
                  style={ConfigRepository.lang === lang.lang ? styles.slideImageSelected : styles.slideImage}
                />
              </TouchableHighlight>
            </GridItemWrapperInner>
          ))}
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
          <GridItemWrapperInner width="100%">
            <Title2 color={ConfigRepository.color.text}>
              {I18n.t("currency")} ({ConfigRepository.currency})
            </Title2>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={60}>
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
      </ContainerInner>
    </Container>
  );
}

const styles = StyleSheet.create({
  applyColorButton: {
    width: '90%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  langTouch: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  slideImage: {
    width: 40,
    height: 30,
  },
  slideImageSelected: {
    width: 52,
    height: 39,
  },
});
