import React from "react";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { RoutesType } from "../../types/types";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { GridItemWrapperInner, GridItemWrapperRow } from "../../components/GridItemInner";
import { Text } from "../../components/Text";

const BottomNavigation: React.FC<RoutesType> = ({
  routes,
  active
}: RoutesType) => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Container
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
      border={
        Colors[colorScheme ?? "light"].primary
      }
      height="55px"
      noPadding
    >
      <ContainerInner>
        <GridItemWrapperRow height={100} >

          {routes.map((r) =>
            r.addButton ? (
              <GridItemWrapperInner width={15} height={100} key={`ItemAdd-${r.name}`} justify="center" align="center">
                <Styled.ItemAddButton
                  background={
                    Colors[colorScheme ?? "light"].primary
                  }
                  key={`ItemAdd-${r.name}`}
                  onPress={() => r.func()}
                  boder={
                    Colors[colorScheme ?? "light"].primary
                  }
                >
                  <Text
                    color={Colors[colorScheme ?? "light"].white} align="center"
                  >
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={Colors[colorScheme ?? "light"].white}
                    />
                  </Text>
                </Styled.ItemAddButton>
              </GridItemWrapperInner>
            ) : (
              <GridItemWrapperInner width={20} height={100}
                key={`Item-${r.name}`}>
                <Styled.Item
                  onPress={() => r.func()}
                  active={r.name === active}
                  boder={
                    Colors[colorScheme ?? "light"].primary
                  }
                >
                  <Text
                    color={Colors[colorScheme ?? "light"].primary} align="center"
                  >
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={r.name === active ? Colors[colorScheme ?? "light"].menuButtonActiveColor : Colors[colorScheme ?? "light"].menuButtonColor}
                    />
                  </Text>
                </Styled.Item>
              </GridItemWrapperInner>
            )
          )}
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
};

export default BottomNavigation;
