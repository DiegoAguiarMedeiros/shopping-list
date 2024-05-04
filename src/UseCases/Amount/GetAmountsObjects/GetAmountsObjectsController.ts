import IAmount from "../../../Model/IAmount";
import { IControllerGetAmountsObject } from "../../interface/IController";
import GetAmountsObjectsUseCase from "./GetAmountsObjectsUseCase";

export default class GetAmountsController
  implements IControllerGetAmountsObject
{
  constructor(private getAmountsObjectsUseCase: GetAmountsObjectsUseCase) {}

  handle = (): IAmount[] => {
    try {
      return this.getAmountsObjectsUseCase.execute();
    } catch (err) {
      console.error("GetAmountsController: ", err);
      return [];
    }
  };
}
