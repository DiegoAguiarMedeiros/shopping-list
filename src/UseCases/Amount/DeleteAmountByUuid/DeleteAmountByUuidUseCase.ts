import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IControllerGetAmounts, IControllerSaveAmount } from "../../interface/IController";

export default class DeleteAmountByUuidUseCase {
    constructor(private mmkv: IMMKVStorage, private getAmounts: IControllerGetAmounts, private saveAmount: IControllerSaveAmount) { }
    execute = (key: string): void => {
        try {
            this.mmkv.delete(key);
            const listsStringOrNull = this.mmkv.get('SLSHOPPINGAMOUNT');
            if (listsStringOrNull) {
                const lists: IListInterface<IAmount> = listsStringOrNull ? JSON.parse(listsStringOrNull) : listsStringOrNull;
                delete lists[key];
                this.saveAmount.handle(lists);
            }
        } catch (error) {
            console.error("DeleteListUseCase", error);
        }
    };
}