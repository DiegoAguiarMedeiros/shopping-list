import React from "react";
import {
  View,
  StyleSheet, DimensionValue
} from "react-native";

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

export interface ContainerInnerProps {
  children: React.ReactNode;
  background?: string;
  justify?: justifyType;
  height?: DimensionValue;
  align?: alignType;
}

const ContainerInner: React.FC<ContainerInnerProps> = ({
  background,
  children,
  justify,
  height,
  align
}) => {
  return (
    <View style={[styles.container,
    background && { backgroundColor: background },
    height !== undefined ? { height } : { height: '100%' },
    justify !== undefined ? { justifyContent: justify } : { justifyContent: 'flex-start' },
    align ? { alignItems: align } : { alignItems: "center" }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1
  }
});

export default ContainerInner;
