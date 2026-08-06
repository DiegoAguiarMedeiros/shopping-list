import AppIntroSlider from "react-native-app-intro-slider";
import { StyleSheet, View, Text as RNText, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Title } from "../../components/Text";
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
    <View style={[styles.container, { backgroundColor: ConfigRepository.color.backgroundPrimary }]}>
      <View style={[styles.slideContainer, { backgroundColor: ConfigRepository.color.backgroundPrimary }]}>
        <View style={styles.slideContainerInnerTitle}>
          <RNText style={[styles.slideTitle, { color: ConfigRepository.color.text }]}>
            {item.title}
          </RNText>
        </View>
        <View style={styles.slideContainerInnerImage}>
          <Image source={item.image} style={styles.slideImage} />
        </View>
        <View style={styles.slideContainerInnerText}>
          <RNText style={[styles.slideText, { color: ConfigRepository.color.text }]}>
            {item.text}
          </RNText>
        </View>
      </View>
    </View>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: ConfigRepository.color.backgroundPrimary }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainerInnerTitle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  slideContainerInnerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainerInnerText: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  slideText: {
    fontSize: 16,
    marginTop: 16,
    marginHorizontal: 32,
    textAlign: 'center',
  },
  slideImage: {
    width: 200,
    height: 200,
  },
});

export default OnboardingScreen;
