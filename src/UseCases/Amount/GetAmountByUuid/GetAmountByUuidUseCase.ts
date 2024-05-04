import IAmount from "../../../Model/IAmount";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetAmountByListProductUuidUseCase {
  constructor(private mmkv: IMMKVStorage) {}
  execute(key: string): IAmount {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const amount: IAmount = JSON.parse(data);
        return amount;
      }
      return {
        uuid: "",
        amount: "",
        type: false,
        quantity: "",
        listProductUuid: "",
      };
    } catch (error) {
      console.error("GetAmountByListProductUuidUseCase", error);
      return {
        uuid: "",
        amount: "",
        type: false,
        quantity: "",
        listProductUuid: "",
      };
    }
  }
}
