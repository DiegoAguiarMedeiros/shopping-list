import { useState } from 'react';
import { useColorScheme } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../constants/Colors';
import * as Styled from './styles';



interface Slide {
  key: string;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
}



const slides: Slide[] = [
  {
    key: 'slide1',
    title: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../../assets/images/onboarding-image-1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'slide2',
    title: 'Get Started',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: require('../../assets/images/onboarding-image-2.png'),
    backgroundColor: '#febe29',
  },
];


interface onboadingProps {
  closeOnboarding: () => void,
}
const OnboardingScreen = ({ closeOnboarding }: onboadingProps) => {
  const colorScheme = useColorScheme();
  const renderItem = ({ item }: { item: Slide }) => (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.SlideContainer background={Colors[colorScheme ?? 'light'].background}>
        <Styled.SlideContainerInnerTitle>
          <Styled.SlideTitle text={Colors[colorScheme ?? 'light'].text}>{item.title}</Styled.SlideTitle>
        </Styled.SlideContainerInnerTitle>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={item.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.SlideContainerInnerText>
          <Styled.SlideText text={Colors[colorScheme ?? 'light'].text}>{item.text}</Styled.SlideText>
        </Styled.SlideContainerInnerText>
      </Styled.SlideContainer>
    </Styled.Container>
  );



  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      skipLabel={'Pular'}
      prevLabel={'Voltar'}
      nextLabel={'Próximo'}
      doneLabel={'Fechar'}
      showPrevButton
      showSkipButton
      dotStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].secondary }}
      activeDotStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].primary }}
      onDone={closeOnboarding}
    />
  );
};

export default OnboardingScreen;