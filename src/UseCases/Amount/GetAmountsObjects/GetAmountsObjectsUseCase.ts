import IAmount from "../../../Model/IAmount";
import {
  IControllerGetAmounts,
  IControllerGetAmountByUuid,
} from "../../interface/IController";

export default class GetAmountsObjectsUseCase {
  constructor(
    private getAmounts: IControllerGetAmounts,
    private getAmountsByUuid: IControllerGetAmountByUuid
  ) {}
  execute = (): IAmount[] => {
    try {
      const data = this.getAmounts.handle();
      const result: IAmount[] = [];
      data.forEach((l) => {
        const amountsByUuid = this.getAmountsByUuid.handle(l);
        if (amountsByUuid) result.push(amountsByUuid);
      });
      return result;
    } catch (error) {
      console.error("GetAmountsObjectsUseCase", error);
      return [];
    }
  };
}
