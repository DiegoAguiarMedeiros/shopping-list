import { IControllerGetListProductsByUuid } from "../../interface/IController";

export default class GetTagsByProductUuidArrayUseCase {

    constructor(private getListProducts: IControllerGetListProductsByUuid) { }
    execute(productId: string[]): string[] {
        const products = this.getListProducts.handle(productId);

        if (products) {
            return products.map(product => product.tag)
        }
        return []
    }
}