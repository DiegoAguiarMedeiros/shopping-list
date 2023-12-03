import { IControllerGetListByUuid, IControllerGetListProductsByUuid, IControllerGetTotalAmounts } from "../../interface/IController";

export default class GetTotalQuantityWithoutAmountByListUuidUseCase {
    constructor(private getListByUuid: IControllerGetListByUuid,
        private getProducts: IControllerGetListProductsByUuid,
        private getTotalAmount: IControllerGetTotalAmounts) { }
    execute(listUuid: string): number {

        const list = this.getListByUuid.handle(listUuid);
        const products = this.getProducts.handle(list.items);
        const totalProducts = products?.map(product => (this.getTotalAmount.handle(`${listUuid}-${product.uuid}`)))
        let total: number = 0;
        totalProducts?.forEach((product) => {
            total = total + product;
        });
        return total;

    }
}