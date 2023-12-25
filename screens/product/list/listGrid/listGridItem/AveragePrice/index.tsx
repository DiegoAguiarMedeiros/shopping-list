
import { useColorScheme } from "react-native";
import * as Styled from "./styles";
import Colors from "../../../../../../constants/Colors";

import { Text } from "../../../../../../components/Text";
import Container from "../../../../../../components/Container";
import { ILastPrices } from "../../../../../../Domain/Model/IProduct";
interface AveragePriceProps {
    price: ILastPrices[];
}

export default function AveragePrice({
    price,
}: Readonly<AveragePriceProps>) {

    const colorScheme = useColorScheme();

    const calculateAveragePrice = (items: ILastPrices[]): number => {
        const prices: number[] = items.map(item => item.price);

        if (prices.length === 0) {
            return 0; // Return 0 for an empty array, or handle this case differently
        }

        const sum = prices.reduce((total, price) => total + price, 0);
        const average = sum / prices.length;
        return average;
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
            >R$ {calculateAveragePrice(price).toFixed(2)}</Text>
        </>
    );
}