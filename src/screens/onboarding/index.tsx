import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { StyleSheet, View, Text as RNText, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Title } from "../../components/Text";
import { useStores } from "../../context/StoreContext";
import defaultTags from "../../Model/Mocks/Tag";
import defaultProducts from "../../Model/Mocks/Product";

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

type Feedback = { type: "success" | "error"; message: string } | null;

const OnboardingScreen = ({ closeOnboarding }: OnboadingProps) => {
  const { ConfigRepository } = useStores();
  const { TagRepository, ProductRepository } = useStores();
  const [seeding, setSeeding] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Feedback>(null);
  const handleAddDefaultData = async () => {
    setSeeding(true);
    setFeedback(null);
    try {
      const existingTags = TagRepository.getAllItemsMap();
      if (!existingTags || existingTags.length === 0) {
        defaultTags.forEach((t: any) => TagRepository.addItemByUuid(t));
        TagRepository.addItemsToStorage(JSON.stringify(defaultTags.map((t: any) => t.uuid)));
        TagRepository.load();
      }

      const existingProducts = ProductRepository.getAllItemsMap();
      if (!existingProducts || existingProducts.length === 0) {
        defaultProducts.forEach((p: any) => ProductRepository.addItemByUuid(p));
        ProductRepository.addItemsToStorage(JSON.stringify(defaultProducts.map((p: any) => p.uuid)));
        ProductRepository.load();
      }
      setFeedback({ type: "success", message: "Itens padrão adicionados com sucesso!" });
    } catch (error) {
      console.error("Failed to seed defaults:", error);
      setFeedback({ type: "error", message: "Não foi possível adicionar os itens padrão." });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSeeding(false);
    }
  };
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
          {item.key === "slide4" && (
            <TouchableOpacity
              onPress={handleAddDefaultData}
              style={[styles.addButton, { backgroundColor: ConfigRepository.color.info }]}
              disabled={seeding}
            >
              {seeding ? (
                <ActivityIndicator color={ConfigRepository.color.textSecondary} />
              ) : (
                <Title color={ConfigRepository.color.textSecondary}>Adicionar itens padrão</Title>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
  const slides: Slide[] = [
    {
      key: "slide1",
      title: <Title color={ConfigRepository.color.text}>Organize suas compras</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
          Crie uma lista para cada compra e mantenha tudo o que você precisa em um só lugar.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide2",
      title: <Title color={ConfigRepository.color.text}>Encontre tudo com facilidade</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
          Cadastre produtos e organize-os por categoria para montar sua lista de forma mais prática.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-2.png"),
      backgroundColor: "#febe29",
    },
    {
      key: "slide3",
      title: <Title color={ConfigRepository.color.text}>Acompanhe seus gastos</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
          Registre os preços dos itens para visualizar o total da compra e consultar o histórico quando precisar.
        </Text>
      ),
      image: require("../../../assets/images/onboarding-image-1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: "slide4",
      title: <Title color={ConfigRepository.color.text}>Comece mais rápido</Title>,
      text: (
        <Text color={ConfigRepository.color.text}>
          Adicione itens padrão, organizados por categoria, e comece a sua próxima compra sem cadastrar tudo do zero.
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
        renderDoneButton={() => (
          <TouchableOpacity onPress={closeOnboarding} style={{ paddingHorizontal: 16 }} disabled={seeding}>
            <Title color={ConfigRepository.color.textSecondary}>Concluir</Title>
          </TouchableOpacity>
        )}
        renderPrevButton={() => <Title color={ConfigRepository.color.textSecondary}>Voltar</Title>}
        showPrevButton
        showSkipButton
        dotStyle={{ backgroundColor: ConfigRepository.color.text }}
        activeDotStyle={{
          backgroundColor: ConfigRepository.color.info,
        }}
        onDone={() => {
          if (!seeding) closeOnboarding();
        }}
      />
      {seeding && (
        <View style={[styles.loadingOverlay, { backgroundColor: ConfigRepository.color.backgroundPrimary }]}>
          {!feedback && <ActivityIndicator size="large" color={ConfigRepository.color.info} />}
          <RNText style={[styles.loadingMessage, { color: ConfigRepository.color.text }]}>
            {feedback?.message ?? "Adicionando itens padrão..."}
          </RNText>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 24,
    textAlign: 'center',
  },
  slideContainerInnerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainerInnerText: {
    flex: 1,
    alignItems: 'center',
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
  addButton: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 24,
    minHeight: 48,
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    opacity: 0.96,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  loadingMessage: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
});

export default OnboardingScreen;
