import getTagByProductUuidControler from "../../ListProduct/GetTagByProductUuid";
import { IControllerGetListByUuid, IControllerGetTagByProductsUuid, IControllerSaveListByUuid } from "../../interface/IController";


export default class AddProductToListByUuidUseCase {

    constructor(private getListByUuid: IControllerGetListByUuid,
        private saveListByUuid: IControllerSaveListByUuid,
        private getTag: IControllerGetTagByProductsUuid
    ) { }

    execute(listUuid: string, productsUuid: string) {

        const list = this.getListByUuid.handle(listUuid);
        list.items.push(productsUuid)
        list.tags.push(this.getTag.handle(productsUuid))
        this.saveListByUuid.handle(list);

    }

}