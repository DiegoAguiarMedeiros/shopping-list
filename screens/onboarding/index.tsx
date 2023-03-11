import { useState } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import ImageSlider from 'react-native-image-slider-box';

const images = ['https://source.unsplash.com/1024x768/?nature', 'https://source.unsplash.com/1024x768/?water', 'https://source.unsplash.com/1024x768/?tree',];



const OnboardingScreen = () => {
    const colorScheme = useColorScheme();
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSkip = () => {
        // Navigate to the next screen in your navigation
    };

    return (
        <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
            <ImageSlider
                images={images}
                autoplay
                circleLoop
            />
            <Styled.ImageContainer>
                <Styled.ImageStyled source={require('../../assets/images/onboarding-image-1.png')} />
            </Styled.ImageContainer>
            <Styled.Title>Onboarding Step {step}</Styled.Title>
            <Styled.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Styled.Description>
            <Styled.Button title={step === 3 ? 'Finish' : 'Next'} onPress={handleNext} />
            {step === 1 && <Styled.Button title="Skip" onPress={handleSkip} />}
        </Styled.Container>
    );
};

export default OnboardingScreen;