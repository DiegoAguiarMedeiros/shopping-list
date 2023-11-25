import { IProduct } from "../../../Model/IProduct";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetTagByProductUuidUseCase {
    constructor(private mmkv: IMMKVStorage) { }
    execute(key: string): string {
        try {
            const data = this.mmkv.get(key);
            if (data) {
                const list: IProduct = JSON.parse(data);
                return list.tag;
            }
            return "";
        } catch (error) {
            console.error("GetTagByProductUuidUseCase", error);
            return "";
        }
    };
}