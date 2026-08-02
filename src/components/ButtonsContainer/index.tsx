import { View, StyleSheet } from "react-native";

const ButtonsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%',
        gap: 10,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ButtonsContainer;