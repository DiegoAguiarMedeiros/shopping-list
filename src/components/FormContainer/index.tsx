import { View, Dimensions,StyleSheet } from "react-native";

const FormContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 0,
    },
});

export default FormContainer;