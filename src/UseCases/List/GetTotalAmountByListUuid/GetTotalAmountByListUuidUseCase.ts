import { IProduct } from "../../../Model/IProduct";
import {
  IControllerGetListByUuid,
  IControllerGetListProductsByUuid,
  IControllerGetTotalAmounts,
  IControllerGetTagUuidByTagName,
} from "../../interface/IController";

export default class GetTotalAmountByListUuidUseCase {
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
      const totalProducts = products?.map((product) =>
        this.getTotalAmount.handle(`${listUuid}-${product.uuid}`)
      );
      let total: number = 0;
      totalProducts?.forEach((product) => {
        total = total + product;
      });
      return total;
    }

    const filteredProductsList = products.filter(
      (product) => this.getTagUuidByTagName.handle(filter) === product.tag
    );

    const totalProducts = filteredProductsList?.map((product) =>
      this.getTotalAmount.handle(`${listUuid}-${product.uuid}`)
    );
    let total: number = 0;
    totalProducts?.forEach((product) => {
      total = total + product;
    });
    return total;
  }
}