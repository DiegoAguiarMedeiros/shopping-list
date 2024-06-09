import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetListByUuid,
  IControllerGetListProductsByUuid,
  IControllerGetTagUuidByTagName,
  IControllerGetTotalAmounts,
} from "../../interface/IController";

export default class GetTotalQuantityWithoutAmountByListUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private getListProductsByUuid: IControllerGetListProductsByUuid,
    private getTagUuidByTagName: IControllerGetTagUuidByTagName,
    private getTotalAmount: IControllerGetTotalAmounts
  ) {}
  execute(listUuid: string, filter: string): number {
    const list = this.getListByUuid.handle(listUuid);
    const products = this.getListProductsByUuid.handle(list.items);

    if (filter === "Todos") {
      const totalProducts: { total: number } = { total: 0 };
      products?.forEach((product) => {
        const resultAmount = this.getTotalAmount.handle(
          `${listUuid}-${product.uuid}`
        );
        if (resultAmount > 0) totalProducts.total += resultAmount;
      });

      return totalProducts.total;
    }

    const filteredProductsList = products.filter(
      (product) => this.getTagUuidByTagName.handle(filter) === product.tag
    );

    const totalProducts: { total: number } = { total: 0 };
    filteredProductsList?.forEach((product) => {
      const resultAmount = this.getTotalAmount.handle(
        `${listUuid}-${product.uuid}`
      );
      if (resultAmount > 0) totalProducts.total += resultAmount;
    });

    return totalProducts.total;
  }
}