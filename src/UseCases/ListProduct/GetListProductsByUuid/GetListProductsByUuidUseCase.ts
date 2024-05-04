import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetAllProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetListProductsByUuidUseCase {
  constructor(
    private getProducts: IControllerGetAllProducts,
    private getProductsByUuid: IControllerGetProductsByUuid
  ) {}
  execute(productsUuid: string[]): IProduct[] {
    const productsUuids = this.getProducts.handle();

    const result: IProduct[] = [];
    productsUuids.forEach((p) => {
      const product = this.getProductsByUuid.handle(p);
      if (product && productsUuid.includes(product.uuid)) result.push(product);
    });
    return result;
  }
}
