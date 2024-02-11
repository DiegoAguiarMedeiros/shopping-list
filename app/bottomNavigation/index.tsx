import React from "react";
import { useColorScheme } from "react-native";

import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { RoutesType } from "../../types/types";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import {
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../components/GridItemInner";
import { Text } from "../../components/Text";
import { useShoppingListContext } from "../../context/ShoppingList";

const BottomNavigation: React.FC<RoutesType> = ({
  color,
  routes,
  active,
}: RoutesType) => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const { getTheme } = useShoppingListContext();
  return (
    <Container
      background={color[getTheme()].backgroundPrimary}
      border={color[getTheme()].primary}
      height="55px"
      noPadding
      elevation={colorScheme === "light"}
    >
      <ContainerInner>
        <GridItemWrapperRow height={100}>
          {routes.map((r) =>
            r.addButton ? (
              <GridItemWrapperInner
                width={15}
                height={100}
                key={`ItemAdd-${r.name}`}
                justify="center"
                align="center"
              >
                <Styled.ItemAddButton
                  background={color[getTheme()].primary}
                  key={`ItemAdd-${r.name}`}
                  onPress={() => r.func()}
                  boder={color[getTheme()].primary}
                >
                  <Text color={color[getTheme()].white} align="center">
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={color[getTheme()].white}
                    />
                  </Text>
                </Styled.ItemAddButton>
              </GridItemWrapperInner>
            ) : (
              <GridItemWrapperInner
                width={20}
                height={100}
                key={`Item-${r.name}`}
              >
                <Styled.Item
                  onPress={() => r.func()}
                  active={r.name === active}
                  boder={color[getTheme()].primary}
                >
                  <Text color={color[getTheme()].primary} align="center">
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={
                        r.name === active
                          ? color[getTheme()].menuButtonActiveColor
                          : color[getTheme()].menuButtonColor
                      }
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
