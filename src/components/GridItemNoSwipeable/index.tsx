import React from "react";
import { StyleSheet, View } from "react-native";
export interface GridItemNoSwipeableProps {
  children: React.ReactNode;
}
const GridItemNoSwipeable: React.FC<GridItemNoSwipeableProps> = ({
  children
}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 1,
  },
});

export default GridItemNoSwipeable;
