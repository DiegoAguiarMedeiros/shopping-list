import IAmount from "../../../Model/IAmount";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetAmountByListProductUuidUseCase {
  constructor(private mmkv: IMMKVStorage) {}

  execute(key: string): IAmount | null {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const amount: IAmount = JSON.parse(data);
        return amount;
      } else {
        return null;
      }
    } catch (error) {
      console.error("GetAmountByListProductUuidUseCase error:", error);
      return null;
    }
  }
}

