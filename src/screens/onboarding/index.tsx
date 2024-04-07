import { useState } from "react";
import { useColorScheme } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

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
  const { getTheme, getColor } = useShoppingListContext();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container background={getColor().backgroundPrimary}>
      <Styled.SlideContainer background={getColor().backgroundPrimary}>
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle text={getColor().backgroundPrimary}>
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={getColor().backgroundPrimary}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={getColor().text}>Welcome</Title>,
      text: (
        <Text color={getColor().text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={getColor().text}>Get Started</Title>,
      text: (
        <Text color={getColor().text}>
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
        <Title color={getColor().textSecondary}>Pular</Title>
      )}
      renderNextButton={() => (
        <Title color={getColor().textSecondary}>Próximo</Title>
      )}
      renderDoneButton={() => (
        <Title color={getColor().textSecondary}>Fechar</Title>
      )}
      renderPrevButton={() => (
        <Title color={getColor().textSecondary}>Voltar</Title>
      )}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: getColor().text }}
      activeDotStyle={{
        backgroundColor: getColor().info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
