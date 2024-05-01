import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListByUuid, IControllerGetListProductsByUuid, IControllerGetTotalAmounts } from "../../interface/IController";

export default class GetTotalQuantityWithoutAmountByListUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private getListProductsByUuid: IControllerGetListProductsByUuid,
    private getTotalAmount: IControllerGetTotalAmounts
  ) {}
  execute(listUuid: string, productsList?: IProduct[]): number {
    const list = this.getListByUuid.handle(listUuid);
    const products =
      productsList ?? this.getListProductsByUuid.handle(list.items);

    const totalProducts: { total: number } = { total: 0 };
    products?.forEach((product) => {
      const resultAmount = this.getTotalAmount.handle(
        `${listUuid}-${product.uuid}`
      );
      if (resultAmount > 0) totalProducts.total += resultAmount;
    });

    return totalProducts.total;
  }
}