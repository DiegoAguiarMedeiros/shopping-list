import { IControllerDeleteAmountByUuid, IControllerGetAMountsbyListProductsByUuid, IControllerGetListByUuid, IControllerGetTagsByProductsUuid, IControllerSaveListByUuid } from "../../interface/IController";

export default class DeleteProductFromListByUuidUseCase {

    constructor(private deleteAmount: IControllerDeleteAmountByUuid,
        private getAmountByListProductUuid: IControllerGetAMountsbyListProductsByUuid,
        private saveListByUuid: IControllerSaveListByUuid,
        private getTag: IControllerGetTagsByProductsUuid,
        private getListByUuid: IControllerGetListByUuid) { }


    excecute(listId: string, productId: string) {
        const result = this.getAmountByListProductUuid.handle(listId + "-" + productId);
        result.forEach(amount => this.deleteAmount.handle(amount.uuid))
        const list = this.getListByUuid.handle(listId);
        list.items = list.items.filter(uuid => uuid !== productId);
        list.tags = this.getTag.handle(list.items);
        this.saveListByUuid.handle(list);
    }
}