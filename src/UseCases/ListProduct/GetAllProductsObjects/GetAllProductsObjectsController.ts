import { sortArrayOfObjects } from "../../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetAllProductsObject } from "../../interface/IController";
import GetAllProductsObjectsUseCase from "./GetAllProductsObjectsUseCase";

export default class GetAllProductsObjectsController
  implements IControllerGetAllProductsObject
{
  constructor(
    private getAllProductsObjectsUseCase: GetAllProductsObjectsUseCase
  ) {}

  handle = (): IProduct[] => {
    try {
      return this.getAllProductsObjectsUseCase.execute();
    } catch (err) {
      console.error("GetAllProductsObjectsController: ", err);
      return [];
    }
  };
}
