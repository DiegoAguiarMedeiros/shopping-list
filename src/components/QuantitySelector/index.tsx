import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, StyleProp, TextInput, TextInputKeyPressEvent, TouchableOpacity, ViewStyle, View } from "react-native";
import IAmount from "../../Model/IAmount";
import { useStores } from "../../context/StoreContext";
import QuantitySelectorButtons from "./QuantitySelector";
import { Text } from "../Text";

type QuantitySelectorProps = {
    value: string;
    onDecrement: () => void;
    onIncrement: () => void;
    onChangeText: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
    type: boolean;
    handleDecimalInputChange: (event: TextInputKeyPressEvent) => void;
    editItemsAmount?: (selectedValueSwitch: boolean) => void
    TextInputBackgoundColor: string;
}

const QuantitySelector = ({
    value,
    onDecrement,
    onIncrement,
    onChangeText,
    keyboardType = "numeric",
    placeholder,
    type,
    handleDecimalInputChange,
    editItemsAmount,
    TextInputBackgoundColor,

}: QuantitySelectorProps) => {
    const { ConfigRepository } = useStores();
    const [selectedValueSwitch, setSelectedValueSwitch] = useState(type);

    const onPress = () => {
        onChangeText(selectedValueSwitch ? "1" : "1.000")
        setSelectedValueSwitch(prev => !prev)
        editItemsAmount && editItemsAmount(selectedValueSwitch)
    }
    return (
        <View style={[styles.qtdContainer]}>
            {selectedValueSwitch ? (
                <TextInput
                    style={[
                        styles.qtdInput,
                        {
                            backgroundColor: TextInputBackgoundColor,
                            color: ConfigRepository.color.text,
                            textAlign: "center",
                            width: 100,
                            height: 28,
                            marginHorizontal: 6,
                            borderRadius: 10,
                            fontSize: 14,
                            padding: 0,
                        }]}
                    keyboardType="decimal-pad"
                    placeholder="0.000"
                    onKeyPress={(event) => handleDecimalInputChange(event)}
                    value={value}
                />
            ) : (
                <QuantitySelectorButtons
                    value={value}
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    TextInputBackgoundColor={TextInputBackgoundColor}
                />
            )}
            <TouchableOpacity
                style={[
                    styles.qtdBtn,
                    {
                        backgroundColor: ConfigRepository.color.primary,
                    },
                ]}
                onPress={onPress}
            >
                <Text color={ConfigRepository.color.onPrimary}>
                    {selectedValueSwitch ? "Kg" : "Un"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    qtdContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    qtdBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    qtdInput: {
        width: 42,
        height: 28,
        marginHorizontal: 6,
        borderRadius: 6,
        textAlign: "center",
        fontSize: 14,
        padding: 0,
    },
});

export default QuantitySelector