import AppIntroSlider from "react-native-app-intro-slider";

import { Text, Title } from "../../components/Text";
import * as Styled from "./styles";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

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
  const { ConfigRepository } = useStores();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container background={ConfigRepository.color.backgroundPrimary}>
      <Styled.SlideContainer background={ConfigRepository.color.backgroundPrimary}>
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle text={ConfigRepository.color.backgroundPrimary}>
            {item.title}
          </Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={ConfigRepository.color.backgroundPrimary}>
            {item.text}
          </Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={ConfigRepository.color.text}>Welcome</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={ConfigRepository.color.text}>Get Started</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
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
      renderSkipButton={() => <Title color={ConfigRepository.color.textSecondary}>Pular</Title>}
      renderNextButton={() => (
        <Title color={ConfigRepository.color.textSecondary}>Próximo</Title>
      )}
      renderDoneButton={() => <Title color={ConfigRepository.color.textSecondary}>Fechar</Title>}
      renderPrevButton={() => <Title color={ConfigRepository.color.textSecondary}>Voltar</Title>}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: ConfigRepository.color.text }}
      activeDotStyle={{
        backgroundColor: ConfigRepository.color.info,
      }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;
