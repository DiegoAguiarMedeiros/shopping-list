import IAmount from "../../../Model/IAmount";
import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListByUuid, IControllerGetListProductsByUuid, IControllerGetTotalAmounts } from "../../interface/IController";

export default class GetTotalQuantityAmountByListUuidUseCase {
    constructor(private getListByUuid: IControllerGetListByUuid,
        private getProducts: IControllerGetListProductsByUuid,
        private getTotalAmount: IControllerGetTotalAmounts) { }
    execute(listUuid: string, productsList?: IProduct[]): number {

        const list = this.getListByUuid.handle(listUuid);
        const products = productsList ?? this.getProducts.handle(list.items);
        const total: { total: number } = { total: 0 };
        products?.forEach((product) => {
          total.total += this.getTotalAmount.handle(
            `${listUuid}-${product.uuid}`
          );
        });
        return total.total;
    }
}