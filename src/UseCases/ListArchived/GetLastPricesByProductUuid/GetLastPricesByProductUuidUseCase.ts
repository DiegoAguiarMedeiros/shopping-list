import IAmount from "../../../Model/IAmount";
import { IControllerGetAMountsbyListProductsByUuid, IControllerGetListsByProductUuid } from "../../interface/IController"

export default class GetLastPricesByProductUuidUseCase{

    constructor(private getListsByProductUuidController: IControllerGetListsByProductUuid,
        private getAmout :IControllerGetAMountsbyListProductsByUuid){}

    execute(productUuid: string): string[]{
        const lists = this.getListsByProductUuidController.handle(productUuid);
        const returnArr = lists.map(list => this.calculateAverageAmount(this.getAmout.handle(`${list.uuid}-${productUuid}`)))
        return returnArr
    }

    calculateAverageAmount(items: IAmount[]): string {
        const amounts: number[] = items.map(item => parseFloat(item.amount));

        if (amounts.length === 0) {
            return '0';
        }

        const sum = amounts.reduce((total, amount) => total + amount, 0);
        const average = sum / amounts.length;
        return average.toFixed(2);
    }
}