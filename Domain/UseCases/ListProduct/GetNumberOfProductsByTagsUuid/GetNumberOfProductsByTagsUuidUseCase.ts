import { IControllerGetListProducts } from "../../interface/IController";

export default class GetNumberOfProductsByTagsUuidUseCase {
    constructor(private getListProductsController: IControllerGetListProducts) { }
    execute(tagUuid: string): number {
        const productsCOunt = this.getListProductsController.handle()?.filter(product => (product.tag === tagUuid));
        return productsCOunt?.length ? productsCOunt?.length : 0;
    }
}