import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveAmountUseCase {
    constructor(
        private mmkv: IMMKVStorage,) { }
    execute = (key: string, data: IListInterface<IAmount>): void => {
        try {
            this.mmkv.set(key, JSON.stringify(data));
        } catch (error) {
            console.error("SaveListsUseCase", error);
        }
    };
}