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
    const totalProducts = products?.map((product) =>
      this.getTotalAmount.handle(`${listUuid}-${product.uuid}`)
    );
    let total: number = 0;
    totalProducts?.forEach((product) => {
      total = total + product;
    });
    return total;
  }
}