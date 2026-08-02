import { View, StyleSheet } from "react-native";

const ButtonWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ButtonWrapper;