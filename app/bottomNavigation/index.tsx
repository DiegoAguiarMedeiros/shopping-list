import React from "react";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { RoutesType } from "../../types/types";

const BottomNavigation: React.FC<RoutesType> = ({
  routes,
  active,
  setActiveRoute,
}: RoutesType) => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // console.log("BottomNavigation routes ", routes);
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].backgroundLighter}
    >
      <Styled.ContainerInner>
        {routes.map((r) => (
          <Styled.Item
            key={`Item-${r.name}`}
            onPress={() => {
              setActiveRoute(r.name);
              router.push({ pathname: r.name });
            }}
            active={r.name === active}
            boder={Colors[colorScheme ?? "light"].buttonBackground}
          >
            <Styled.Text text={Colors[colorScheme ?? "light"].text}>
              <FontAwesome
                size={30}
                name={r.icon}
                color={Colors[colorScheme ?? "light"].textButton}
              />
            </Styled.Text>
          </Styled.Item>
        ))}
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default BottomNavigation;
