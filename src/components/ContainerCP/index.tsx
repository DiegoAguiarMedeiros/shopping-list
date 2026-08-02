import React from "react";

import { StyleSheet, View } from "react-native";

export interface ContainerProps {
  children: React.ReactNode;
}

const ContainerCP: React.FC<ContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    marginRight: 22,
  }
});

export default ContainerCP;
