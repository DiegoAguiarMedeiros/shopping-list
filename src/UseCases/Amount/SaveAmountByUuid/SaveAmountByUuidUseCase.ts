import { convertToInterface } from "../../../utils/functions";
import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import {
  IControllerGetAmounts,
  IControllerSaveAmount,
  IControllerSaveListProductByUuid,
  IControllerGetListProductsByUuid,
  IControllerGetAMountsbyListProductsByUuid,
} from "../../interface/IController";

export default class SaveAmountByUuidUseCase {
  constructor(
    private MMKVStorage: IMMKVStorage,
    private saveAmount: IControllerSaveAmount,
    private getAmount: IControllerGetAmounts,
    private getProductAmount: IControllerGetAMountsbyListProductsByUuid,
    private getProduct: IControllerGetListProductsByUuid,
    private saveProduct: IControllerSaveListProductByUuid
  ) {}
  execute = (data: IAmount): void => {
    try {
      this.MMKVStorage.set(data.uuid, JSON.stringify(data));
      const amount = this.getAmount.handle();
      if (!amount.includes(data.uuid))
        this.saveAmount.handle([...amount, data.uuid]);

    } catch (error) {
      console.error("SaveAmountUseCase", error);
    }
  };
}
