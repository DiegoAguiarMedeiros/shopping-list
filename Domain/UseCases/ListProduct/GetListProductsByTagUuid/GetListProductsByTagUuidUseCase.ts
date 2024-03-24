import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetListProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetListProductsByTagUuidUseCase {
  constructor(
    private getProducts: IControllerGetListProducts,
    private getProductsByUuid: IControllerGetProductsByUuid
  ) {}
  execute(tagUuid: string): string[] {
    const productsUuids = this.getProducts.handle();

    const result: string[] = [];
    productsUuids.forEach((p) => {
      const product = this.getProductsByUuid.handle(p);
      if (product && product.tag === tagUuid) result.push(product.tag);
    });
    return result;
  }
}