import { StyleSheet, View } from "react-native";


type HeaderProps = {
    background: string,
    bottom?: React.ReactNode,
}
export default function Header({ background, bottom }: Readonly<HeaderProps>) {
    return (<View style={[styles.containerHeader, { backgroundColor: background }]}>
        {bottom ? <View style={styles.containerHeaderBottom}>
            {bottom}
        </View> : <></>}
    </View>)
}

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        flexDirection: 'column'
    },
    containerHeaderBottom: {
        width: '100%',
        height: 55,
        justifyContent: 'center'
    },
});