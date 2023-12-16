
import { useColorScheme } from "react-native";
import * as Styled from "./styles";
import Colors from "../../../../../../constants/Colors";

import { Text } from "../../../../../../components/Text";
import Container from "../../../../../../components/Container";
interface AveragePriceProps {
    price: number[];
}

export default function AveragePrice({
    price,
}: Readonly<AveragePriceProps>) {

    const colorScheme = useColorScheme();

    const average = (price: number[]): number => {

        const initialValue = 0;
        const total = price.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );

        return total / price.length;
    }

    return (
        <>
            <Text
                color={
                    colorScheme !== "dark"
                        ? Colors[colorScheme ?? "light"].black
                        : Colors[colorScheme ?? "light"].white
                }
            >Preço médio</Text>
            <Text
                color={
                    colorScheme !== "dark"
                        ? Colors[colorScheme ?? "light"].black
                        : Colors[colorScheme ?? "light"].white
                }
            >R$ {average(price)}</Text>
        </>
    );
}
