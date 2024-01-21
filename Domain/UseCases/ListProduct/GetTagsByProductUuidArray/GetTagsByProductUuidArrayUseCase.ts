import { IControllerGetListProductsByUuid } from "../../interface/IController";

export default class GetTagsByProductUuidArrayUseCase {

    constructor(private getListProducts: IControllerGetListProductsByUuid) { }
    execute(productId: string[]): string[] {
        const products = this.getListProducts.handle(productId);
        console.log("products",products)
        if (products) {
            return Array.from(new Set(products.map(product => product.tag)))
        }
        return []
    }
}