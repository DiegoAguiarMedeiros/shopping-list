import { Image, StyleSheet, View } from "react-native";
import { Text } from "../Text";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { useStores } from "../../context/StoreContext";

const emptyListImage = require("../../../assets/images/emptyList.png");

type EmptyListProps = {
  mensage?: string;
};

export default function EmptyList({
  mensage,
}: Readonly<EmptyListProps>) {
  const { ConfigRepository } = useStores();
  const { color } = ConfigRepository;
  return (
    <Container background={color.backgroundPrimary} noPadding height="100%">
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        <View style={styles.slideContainerInnerImage}>
          <Image style={styles.slideImage} source={emptyListImage} />
        </View>
        <View style={[styles.listEmptyTextmessage, { backgroundColor: color.backgroundPrimary }]}>
          <Text color={color.theme === "light" ? color.black : color.white}>
            {mensage}
          </Text>
        </View>
      </ContainerInner>
    </Container >
  );
}

const styles = StyleSheet.create({
  slideContainerInnerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  listEmptyTextmessage: {
    marginTop: '20%',
  },
});