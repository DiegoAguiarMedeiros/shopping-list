import { IProduct } from "../../../Model/IProduct";
import { sortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetAllProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetListProductsByTagUuidUseCase {
  constructor(
    private getProducts: IControllerGetAllProducts,
    private getProductsByUuid: IControllerGetProductsByUuid
  ) {}
  execute(tagUuid: string): IProduct[] {
    const productsUuids = this.getProducts.handle();
    const result: IProduct[] = [];
    productsUuids.forEach((p) => {
      const product = this.getProductsByUuid.handle(p);
      if (product && product.tag === tagUuid) result.push(product);
    });
    return sortArrayOfObjects(result, "name");
  }
}