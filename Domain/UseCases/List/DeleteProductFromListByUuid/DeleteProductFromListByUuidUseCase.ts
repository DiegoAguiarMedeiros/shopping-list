import { IControllerDeleteAmountByUuid, IControllerGetAMountsbyListProductsByUuid, IControllerGetListByUuid, IControllerGetTagByProductsUuid, IControllerSaveListByUuid } from "../../interface/IController";

export default class DeleteProductFromListByUuidUseCase {

    constructor(private deleteAmount: IControllerDeleteAmountByUuid,
        private getAmountByListProductUuid: IControllerGetAMountsbyListProductsByUuid,
        private saveListByUuid: IControllerSaveListByUuid,
        private getTag: IControllerGetTagByProductsUuid,
        private getListByUuid: IControllerGetListByUuid) { }


    excecute(listId: string, productId: string) {
        const result = this.getAmountByListProductUuid.handle(listId + "-" + productId);

        result.forEach(amount => this.deleteAmount.handle(amount.uuid))

        const list = this.getListByUuid.handle(listId);
        list.items = list.items.filter(uuid => uuid !== productId);
        this.saveListByUuid.handle(list);
    }
}