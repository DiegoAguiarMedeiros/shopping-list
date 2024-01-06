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



interface OnboadingProps {
  closeOnboarding: () => void;
}
const OnboardingScreen = ({ closeOnboarding }: OnboadingProps) => {
  const colorScheme = useColorScheme();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
    >
      <Styled.SlideContainer
        background={Colors[colorScheme ?? "light"].backgroundPrimary}
      >
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle
            text={Colors[colorScheme ?? "light"].backgroundPrimary}
          >
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={Colors[colorScheme ?? "light"].backgroundPrimary}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={Colors[colorScheme ?? "light"].text}>Welcome</Title>,
      text: <Text color={Colors[colorScheme ?? "light"].text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>,
      image: require("../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={Colors[colorScheme ?? "light"].text}>Get Started</Title>,
      text: <Text color={Colors[colorScheme ?? "light"].text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>,
      image: require("../../assets/images/onboarding-image-2.png"),
      backgroundColor: "#febe29",
    },
  ];
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderSkipButton={() => <Title color={Colors[colorScheme ?? "light"].textSecondary}>Pular</Title>}
      renderNextButton={() => <Title color={Colors[colorScheme ?? "light"].textSecondary}>Próximo</Title>}
      renderDoneButton={() => <Title color={Colors[colorScheme ?? "light"].textSecondary}>Fechar</Title>}
      renderPrevButton={() => <Title color={Colors[colorScheme ?? "light"].textSecondary}>Voltar</Title>}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: Colors[colorScheme ?? "light"].text }}
      activeDotStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
