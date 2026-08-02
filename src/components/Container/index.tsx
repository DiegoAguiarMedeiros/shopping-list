import React from "react";
import { StyleSheet, View, DimensionValue } from "react-native";
type justifyType =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

type alignType =
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";
export interface ContainerProps {
  children: React.ReactNode;
  background?: string;
  height?: DimensionValue;
  noPadding?: boolean;
  elevation?: boolean;
  justify?: justifyType;
  align?: alignType;
}

const Container: React.FC<ContainerProps> = ({
  background,
  children,
  noPadding,
  height,
  elevation,justify,align
}) => {
  return (
    <View
      style={[
        styles.container,
        background && { backgroundColor: background },
        noPadding ? { padding: 0 } : { padding: 10 },
        height !== undefined ? { height } : { height: '100%' },
        justify !== undefined ? { justifyContent: justify } : { justifyContent: 'center' },
        align !== undefined ? { alignItems: align } : { alignItems: 'center' },
        elevation && { elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  }
});

export default Container;
