import IAmount from "../../../Model/IAmount";
import IStorage from "../../../Service/IMMKVStorage";
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
        result.push(this.getAmountsByUuid.handle(l));
      });
      return result;
    } catch (error) {
      console.error("GetAmountsObjectsUseCase", error);
      return [];
    }
  };
}
