import { useState } from "react";
import { useColorScheme } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Colors from "../../constants/Colors";
import { Text, Title } from "../../components/Text";
import * as Styled from "./styles";
import { useShoppingListContext } from "../../context/ShoppingList";

interface Slide {
  key: string;
  title: React.ReactNode;
  text: React.ReactNode;
  image: any;
  backgroundColor: string;
}

interface OnboadingProps {
  closeOnboarding: () => void;
}
const OnboardingScreen = ({ closeOnboarding }: OnboadingProps) => {
  const colorScheme = useColorScheme();
  const { getTheme } = useShoppingListContext();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container background={Colors[getTheme()].backgroundPrimary}>
      <Styled.SlideContainer background={Colors[getTheme()].backgroundPrimary}>
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle text={Colors[getTheme()].backgroundPrimary}>
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={Colors[getTheme()].backgroundPrimary}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={Colors[getTheme()].text}>Welcome</Title>,
      text: (
        <Text color={Colors[getTheme()].text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={Colors[getTheme()].text}>Get Started</Title>,
      text: (
        <Text color={Colors[getTheme()].text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../assets/images/onboarding-image-2.png"),
      backgroundColor: "#febe29",
    },
  ];
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderSkipButton={() => (
        <Title color={Colors[getTheme()].textSecondary}>Pular</Title>
      )}
      renderNextButton={() => (
        <Title color={Colors[getTheme()].textSecondary}>Próximo</Title>
      )}
      renderDoneButton={() => (
        <Title color={Colors[getTheme()].textSecondary}>Fechar</Title>
      )}
      renderPrevButton={() => (
        <Title color={Colors[getTheme()].textSecondary}>Voltar</Title>
      )}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: Colors[getTheme()].text }}
      activeDotStyle={{
        backgroundColor: Colors[getTheme()].info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
