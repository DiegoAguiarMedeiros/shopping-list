import { DimensionValue, StyleProp, StyleSheet, TextStyle, TouchableHighlight, View } from "react-native";
import { useStores } from "../../context/StoreContext";


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


interface GridItemInnerProps {
    background?: string;
    borderColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    height?: DimensionValue;
    row?: boolean;
    noMargin?: boolean;
    noPadding?: boolean;
    onPress?: () => void;
    elevation?: boolean;
    justify?: justifyType;
    align?: alignType;
    style?: StyleProp<TextStyle>
}

export const GridItemInner = ({ background, borderColor, underlayColor, children, height, row, noPadding, noMargin, onPress, elevation, justify, align, style }: GridItemInnerProps) => {
    const { ConfigRepository } = useStores();

    return (<TouchableHighlight
        style={[styles.item,
        elevation ? { elevation: 3 } : { elevation: 0 },
        background ? { backgroundColor: background } : { backgroundColor: "transparent" },
        borderColor ? { borderColor: borderColor, borderWidth: 1, borderStyle: "solid" } : { borderColor: "transparent" },
        height !== undefined ? { height } : { height: '100%' },
        row ? { flexDirection: "row" } : { flexDirection: "column" },
        noPadding ? { padding: 0 } : { padding: 10 },
        noMargin ? { margin: 0 } : { margin: 5 },
        justify ? { justifyContent: justify } : { justifyContent: "center" },
        align ? { alignItems: align } : { alignItems: "center" },
            style
        ]}
        underlayColor={underlayColor ?? ConfigRepository.color.itemListBackgroundUnderlay}
        onPress={onPress}
        disabled={!onPress}
    >
        <View style={[row ? { flexDirection: "row" } : { flexDirection: "column" }]} >
            {children}
        </View>
    </TouchableHighlight>)
}
interface GridItemWrapperRowProps {
    children: React.ReactNode;
    height?: DimensionValue;
    maxHeight?: DimensionValue;
    justify?: justifyType;
    align?: alignType;
    style?: StyleProp<TextStyle>
}
interface GridItemWrapperColProps {
    children: React.ReactNode;
    width: DimensionValue;
    height?: DimensionValue;
    justify?: justifyType;
    align?: alignType;
    style?: StyleProp<TextStyle>
}

export const GridItemWrapperRow = ({ children, height, maxHeight, justify, align, style }: GridItemWrapperRowProps) => {
    return (<View style={[styles.wrapperRow,
    height !== undefined
        ? { height, flexGrow: 0, flexShrink: 0, flexBasis: "auto" }
        : { flex: 1 },
    maxHeight ? { maxHeight: maxHeight } : { maxHeight: "100%" },
    justify ? { justifyContent: justify } : { justifyContent: "center" },
    align ? { alignItems: align } : { alignItems: "center" },
        style
    ]}>
        {children}
    </View>)
}


export const GridItemWrapperCol = ({ children, width, height, justify, align, style }: GridItemWrapperColProps) => {
    return (<View
        style={[styles.wrapperCol,
        width ? { width } : { width: "100%" },
        height ? { height } : { height: "100%" },
        justify ? { justifyContent: justify } : { justifyContent: "center" },
        align ? { alignItems: align } : { alignItems: "center" },
            style
        ]}
    >
        {children}
    </View>)
}

interface GridItemWrapperInnerProps {
    children: React.ReactNode;
    width?: DimensionValue;
    height?: DimensionValue;
    justify?: justifyType;
    align?: alignType;
    style?: StyleProp<TextStyle>
}


export const GridItemWrapperInner = ({ children, width, height, justify, align, style }: GridItemWrapperInnerProps) => {
    return (
        <View style={[
            width ? { width: width } : { width: "100%" },
            height ? { height } : { height: "100%" },
            justify ? { justifyContent: justify } : { justifyContent: "center" },
            align ? { alignItems: align } : { alignItems: "center" },
            style
        ]}>
            {children}
        </View >)
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 35,
    },
    wrapperRow: {
        width: '100%',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
    wrapperCol: {
        flexDirection: 'column',
    },
    item: {
        borderRadius: 15,
    },
});
