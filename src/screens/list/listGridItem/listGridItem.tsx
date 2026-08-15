import { FontAwesome } from "@expo/vector-icons";
import { GridItemWrapperCol, GridItemWrapperRow, GridItemWrapperInner } from "../../../components/GridItemInner";
import { Title, Title2, Text } from "../../../components/Text";
import { useStores } from "../../../context/StoreContext";
import { IProduct } from "../../../Model/IProduct";
import I18n from "i18n-js";
import IAmount from "../../../Model/IAmount";
import { formatValue } from "../../../utils/functions";

type ListGridItemProps = {
    item: IProduct;
    handleClose: VoidFunction;
    active: boolean
}

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];
export default function ListGridItem({ item, handleClose, active }: ListGridItemProps) {

    const { ListRepository, AmountRepository, ProductRepository, ConfigRepository } = useStores();
    const itemsQTY = ListRepository.listActive?.itemsQTY && ListRepository.listActive?.itemsQTY[item.uuid] ? ListRepository.listActive?.itemsQTY[item.uuid] : "1"
    const showUnitFromAmount = (amounts: IAmount[]): string => {
        let checkUnit: boolean = true;
        let unit: string = "Un";
        let quantity: number = 0;
        amounts.forEach((amount) => {
            if (checkUnit) unit = !amount.type ? "Kg" : "Un";
            if (!amount.type) checkUnit = false;
            quantity = Number(quantity) + Number(amount.quantity);
        });
        if (unit === "Un") {
            return `Un: ${formatValue(quantity.toFixed(0))}`;
        }
        return String(formatValue(quantity.toFixed(3)));
    };

    const getTotalQuantity = (item: IProduct): number =>
        item.amount.reduce((sum, a) => sum + Number(a.quantity || 0), 0);

    const getHasAmount = (item: IProduct): boolean =>
        item.amount.some((a) => a.amount !== "");

    const getItemIconName = (item: IProduct, itemsQTY: string): FontAwesomeIconName => {
        const hasAmount = getHasAmount(item);
        if (item.amount.length > 0 && getTotalQuantity(item) < Number(itemsQTY)) return "exclamation-circle" as FontAwesomeIconName;
        return hasAmount ? "check-circle-o" : "circle-o";
    };

    const getItemIconColor = (item: IProduct, itemsQTY: string): string => {
        const hasAmount = getHasAmount(item);
        if (item.amount.length > 0 && getTotalQuantity(item) < Number(itemsQTY)) return ConfigRepository.color.warning;
        return hasAmount ? ConfigRepository.color.itemListItemOpenIconFilled : ConfigRepository.color.itemListItemOpenIcon;
    };

    return (
        <GridItemWrapperRow maxHeight={50}>
            <GridItemWrapperCol width="10%" >
                <GridItemWrapperRow maxHeight={50}>
                    <GridItemWrapperInner
                        justify="center"
                        align="center"
                    >

                        <Title color={ConfigRepository.color.itemListItemOpenIcon}>
                            <FontAwesome
                                size={28}
                                style={{ marginBottom: -3 }}
                                color={getItemIconColor(item, itemsQTY)}
                                name={getItemIconName(item, itemsQTY)}
                            />
                        </Title>
                    </GridItemWrapperInner>
                </GridItemWrapperRow>
            </GridItemWrapperCol>
            <GridItemWrapperInner width="80%" >
                <GridItemWrapperCol width="100%">
                    <GridItemWrapperInner width="100%" height="50%">
                        <Title2 color={ConfigRepository.color.text}>{itemsQTY.includes(".") || Number(itemsQTY) > 100 ? `${item.name} ${formatValue(itemsQTY)}` : `${formatValue(itemsQTY)} ${item.name}`}</Title2>
                    </GridItemWrapperInner>
                    <GridItemWrapperRow height="50%" justify="space-between" align="flex-start">
                        <GridItemWrapperInner
                            width="50%"
                            justify="flex-start"
                            align="flex-start"
                        >
                            <Text color={ConfigRepository.color.textSecondary}>
                                {I18n.t("total")}: {ConfigRepository.currency} {item.total}
                            </Text>
                        </GridItemWrapperInner>
                        <GridItemWrapperInner width="50%" justify="flex-start" align="flex-start">
                            <Text color={ConfigRepository.color.textSecondary}>
                                {showUnitFromAmount(item.amount)}
                            </Text>
                        </GridItemWrapperInner>
                    </GridItemWrapperRow>
                </GridItemWrapperCol>
            </GridItemWrapperInner>
            <GridItemWrapperInner width="10%" >
                <Title color={ConfigRepository.color.text} align="right">
                    <FontAwesome
                        onPress={() => handleClose()}
                        size={28}
                        style={{ marginBottom: -3 }}
                        name={active ? "angle-up" : "angle-down"}
                    />
                </Title>
            </GridItemWrapperInner>
        </GridItemWrapperRow>
    )
}