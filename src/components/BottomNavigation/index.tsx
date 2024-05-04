import React from "react";

import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RoutesType } from "../../types/types";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";
import { Text } from "../Text";

const BottomNavigation: React.FC<RoutesType> = ({
  color,
  routes,
  active,
}: RoutesType) => {
  return (
    <Container
      background={color.backgroundPrimary}
      border={color.primary}
      height="55px"
      noPadding
      elevation={color.theme === "light"}
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
                  background={color.primary}
                  key={`ItemAdd-${r.name}`}
                  onPress={() => r.func()}
                  boder={color.primary}
                >
                  <Text color={color.white} align="center">
                    <FontAwesome size={25} name={r.icon} color={color.white} />
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
                  boder={color.primary}
                >
                  <Text color={color.primary} align="center">
                    <FontAwesome
                      size={25}
                      name={r.icon}
                      color={
                        r.name === active
                          ? color.menuButtonActiveColor
                          : color.menuButtonColor
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
