import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
      background={ConfigRepository.color.backgroundBottomNavigation}
      height={55}
      noPadding
      elevation={false}
    >
      <ContainerInner>
        <GridItemWrapperRow height={100} justify="space-evenly">
          {routes.map((r) =>
            r.addButton ? (
              <GridItemWrapperInner
                width={'15%'}
                key={`ItemAdd-${r.name}`}
              >
                <Pressable
                  style={[styles.itemAddButton,
                  {
                    backgroundColor: ConfigRepository.color.primaryStrong,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: ConfigRepository.color.primaryStrong,
                  }
                  ]}
                  key={`ItemAdd-${r.name}`}
                  onPress={() => r.func()}
                >
                  <Text color={ConfigRepository.color.onPrimaryStrong} align="center">
                    <FontAwesome size={25} name={r.icon} color={ConfigRepository.color.onPrimaryStrong} />
                  </Text>
                </Pressable>
              </GridItemWrapperInner>
            ) : (
              <GridItemWrapperInner
                width={'20%'}
                key={`Item-${r.name}`}
              >
                <Pressable
                  onPress={() => r.func()}
                  style={[styles.item,
                  {
                    borderTopWidth: r.name === active ? 2 : 0,
                    borderStyle: 'solid',
                    borderColor: ConfigRepository.color.menuButtonActiveColor,
                  }
                  ]}
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
                </Pressable>
              </GridItemWrapperInner>
            )
          )}
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
};

const styles = StyleSheet.create({
  itemAddButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default BottomNavigation;
