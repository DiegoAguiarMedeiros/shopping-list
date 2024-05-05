import { IProduct } from "../../../Model/IProduct";
import { ISortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetAllProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetAllProductsObjectUseCase {
  constructor(
    private getAllProductsController: IControllerGetAllProducts,
    private getProduct: IControllerGetProductsByUuid,
    private sortArrayOfObjects: ISortArrayOfObjects
  ) {}

  execute = (): IProduct[] => {
    try {
      const data = this.getAllProductsController.handle();
      if (data) {
        const list: IProduct[] = [];
        data.forEach((product) => {
          const p = this.getProduct.handle(product);
          if (p) list.push(p);
        });
        return this.sortArrayOfObjects(list, "name");
      }
      return [];
    } catch (error) {
      console.error("GetAllProductsObjectUseCase", error);
      return [];
    }
  };
}
