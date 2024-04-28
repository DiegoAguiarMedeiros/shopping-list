import IAmount from "../../../Model/IAmount";
import { IControllerGetAmounts } from "../../interface/IController";
import GetAmountsUseCase from "./GetAmountsUseCase";

export default class GetAmountsController implements IControllerGetAmounts {
  constructor(private getAmountsUseCase: GetAmountsUseCase) {}

  handle = (): string[] => {
    try {
      return this.getAmountsUseCase.execute("SLSHOPPINGAMOUNT");
    } catch (err) {
      console.error("GetAmountsController: ", err);
      return [];
    }
  };
}