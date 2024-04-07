import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import IStorage from "../../../Service/IMMKVStorage";

export default class GetAmountsUseCase {

    constructor(private mmkv: IStorage) { }

    execute = (key: string): IListInterface<IAmount> | null => {
        try {
            const data = this.mmkv.get(key);
            if (data) {
                const list: IListInterface<IAmount> = JSON.parse(data);
                return list;
            }
            return null;
        } catch (error) {
            console.error("GetListsUseCase", error);
            return null;
        }
    };
}