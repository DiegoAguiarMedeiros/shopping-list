import { useState } from "react";
import { useColorScheme } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Colors from "../../constants/Colors";
import { Text, Title } from "../../components/Text";
import * as Styled from "./styles";

interface Slide {
  key: string;
  title: React.ReactNode;
  text: React.ReactNode;
  image: any;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    key: "slide1",
    title: <Title>Welcome</Title>,
    text: <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>,
    image: require("../../assets/images/onboarding-image-1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: "slide2",
    title: <Title>Get Started</Title>,
    text: <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>,
    image: require("../../assets/images/onboarding-image-2.png"),
    backgroundColor: "#febe29",
  },
];

interface OnboadingProps {
  closeOnboarding: () => void;
}
const OnboardingScreen = ({ closeOnboarding }: OnboadingProps) => {
  const colorScheme = useColorScheme();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].onboardingBackgroundColor}
    >
      <Styled.SlideContainer
        background={Colors[colorScheme ?? "light"].onboardingBackgroundColor}
      >
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle
            text={Colors[colorScheme ?? "light"].bodyTextColor}
          >
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={Colors[colorScheme ?? "light"].bodyTextColor}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      skipLabel={"Pular"}
      prevLabel={"Voltar"}
      nextLabel={"Próximo"}
      doneLabel={"Fechar"}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: Colors[colorScheme ?? "light"].white }}
      activeDotStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
