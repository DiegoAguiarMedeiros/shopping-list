import { IProductTiny } from "../../../Model/IProduct";
import { sortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetAllProducts,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetListProductsTinyByTagUuidUseCase {
  constructor(
    private getProducts: IControllerGetAllProducts,
    private getProductsByUuid: IControllerGetProductsByUuid
  ) {}
  execute(tagUuid: string): IProductTiny[] {
    const productsUuids = this.getProducts.handle();
    const result: IProductTiny[] = [];
    productsUuids.forEach((p) => {
      const product = this.getProductsByUuid.handle(p);
      if (product && product.tag === tagUuid)
        result.push({ name: product.name, id: product.uuid });
    });
    return sortArrayOfObjects(result, "name");
  }
}
