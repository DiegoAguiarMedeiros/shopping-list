import { convertToInterface } from "../../../../utils/functions";
import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IControllerGetAmounts, IControllerSaveAmount, IControllerSaveListProductByUuid, IControllerGetListProductsByUuid, IControllerGetAMountsbyListProductsByUuid } from "../../interface/IController";

export default class SaveAmountByUuidUseCase {
    constructor(private asyncStorage: IMMKVStorage,
        private saveAmount: IControllerSaveAmount,
        private getAmount: IControllerGetAmounts,
        private getProductAmount: IControllerGetAMountsbyListProductsByUuid,
        private getProduct: IControllerGetListProductsByUuid,
        private saveProduct: IControllerSaveListProductByUuid) { }
    execute = (data: IAmount): void => {
        try {
            const firstUUIDLength = 36; // Assuming the length of the first UUID is 36 characters

            this.asyncStorage.set(data.uuid, JSON.stringify(data));
            const amount = this.getAmount.handle();
            if (amount) {
                amount.push(data);
                const newListInterface: IListInterface<IAmount> = convertToInterface(amount);
                this.saveAmount.handle(newListInterface);
            } else {
                const newListInterface: IListInterface<IAmount> = {}
                newListInterface[data.uuid] = data;
                this.saveAmount.handle(newListInterface);
            }


            const listUuid = data.listProductUuid.substring(0, firstUUIDLength); // Extract the first UUID (8-4-4-4-12 characters)
            const productUuid = data.listProductUuid.substring(firstUUIDLength + 1, firstUUIDLength * 2 + 1); // Extract the second UUID after the first one

            const product = this.getProduct.handle([productUuid]);
            const amounts = this.getProductAmount.handle(data.listProductUuid);
            const average = this.calculateAverageAmount(amounts);
            amounts.push(data)
            if (product[0].lastPrices) {
                delete product[0].lastPrices[data.listProductUuid];
            } else {
                product[0].lastPrices = {};
            }
            product[0].lastPrices[data.listProductUuid] = { uuid: data.listProductUuid, price: average };
            this.saveProduct.handle(product[0]);
        } catch (error) {
            console.error("SaveAmountUseCase", error);
        }
    };

    calculateAverageAmount(items: IAmount[]): number {
        const amounts: number[] = items.map(item => parseFloat(item.amount));

        if (amounts.length === 0) {
            return 0; // Return 0 for an empty array, or handle this case differently
        }

        const sum = amounts.reduce((total, amount) => total + amount, 0);
        const average = sum / amounts.length;
        return average;
    }
}