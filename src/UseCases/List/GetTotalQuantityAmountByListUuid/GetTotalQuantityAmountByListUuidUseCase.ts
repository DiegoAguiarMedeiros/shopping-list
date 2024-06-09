import IAmount from "../../../Model/IAmount";
import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetListByUuid,
  IControllerGetListProductsByUuid,
  IControllerGetTagUuidByTagName,
  IControllerGetTotalAmounts,
} from "../../interface/IController";

export default class GetTotalQuantityAmountByListUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private getProducts: IControllerGetListProductsByUuid,
    private getTagUuidByTagName: IControllerGetTagUuidByTagName,
    private getTotalAmount: IControllerGetTotalAmounts
  ) {}
  execute(listUuid: string, filter: string): number {
    const list = this.getListByUuid.handle(listUuid);

    const products = this.getProducts.handle(list.items);

    if (filter === "Todos") {
      const total: { total: number } = { total: 0 };
      products?.forEach((product) => {
        total.total += this.getTotalAmount.handle(
          `${listUuid}-${product.uuid}`
        );
      });
      return total.total;
    }

    const filteredProductsList = products.filter(
      (product) => this.getTagUuidByTagName.handle(filter) === product.tag
    );

    const total: { total: number } = { total: 0 };
    filteredProductsList?.forEach((product) => {
      total.total += this.getTotalAmount.handle(`${listUuid}-${product.uuid}`);
    });
    return total.total;
  }
}