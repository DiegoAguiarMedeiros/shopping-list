import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetAllProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetAllProductsObjectUseCase {
  constructor(
    private getAllProductsController: IControllerGetAllProducts,
    private getProduct: IControllerGetProductsByUuid
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
        return list;
      }
      return [];
    } catch (error) {
      console.error("GetAllProductsObjectUseCase", error);
      return [];
    }
  };
}
