import AppIntroSlider from "react-native-app-intro-slider";

import { Text, Title } from "../../components/Text";
import * as Styled from "./styles";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

interface Slide {
  key: string;
  title: React.ReactNode;
  text: React.ReactNode;
  image: any;
  backgroundColor: string;
}

interface OnboadingProps {
  closeOnboarding: () => void;
  color: colorTheme;
}
const OnboardingScreen = ({ closeOnboarding, color }: OnboadingProps) => {
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container background={color.backgroundPrimary}>
      <Styled.SlideContainer background={color.backgroundPrimary}>
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle text={color.backgroundPrimary}>
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={color.backgroundPrimary}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={color.text}>Welcome</Title>,
      text: (
        <Text color={color.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={color.text}>Get Started</Title>,
      text: (
        <Text color={color.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-2.png"),
      backgroundColor: "#febe29",
    },
  ];
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderSkipButton={() => <Title color={color.textSecondary}>Pular</Title>}
      renderNextButton={() => (
        <Title color={color.textSecondary}>Próximo</Title>
      )}
      renderDoneButton={() => <Title color={color.textSecondary}>Fechar</Title>}
      renderPrevButton={() => <Title color={color.textSecondary}>Voltar</Title>}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: color.text }}
      activeDotStyle={{
        backgroundColor: color.info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
