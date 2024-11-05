import React from "react";

import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RoutesType } from "../../types/types";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";
import { Text } from "../Text";
import { useStores } from "../../context/StoreContext";

const BottomNavigation: React.FC<RoutesType> = ({
  routes,
  active,
}: RoutesType) => {
  const { ConfigRepository } = useStores();
  return (
    <Container
      background={ConfigRepository.color.backgroundPrimary}
      border={ConfigRepository.color.primary}
      height="55px"
      noPadding
      elevation={ConfigRepository.color.theme === "light"}
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
                  background={ConfigRepository.color.primary}
                  key={`ItemAdd-${r.name}`}
                  onPress={() => r.func()}
                  boder={ConfigRepository.color.primary}
                >
                  <Text color={ConfigRepository.color.white} align="center">
                    <FontAwesome size={25} name={r.icon} color={ConfigRepository.color.white} />
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
                  boder={ConfigRepository.color.primary}
                >
                  <Text color={ConfigRepository.color.primary} align="center">
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={
                        r.name === active
                          ? ConfigRepository.color.menuButtonActiveColor
                          : ConfigRepository.color.menuButtonColor
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
