import { IProduct } from "../../../Model/IProduct";
import { IControllerGetListProducts } from "../../interface/IController";

export default class GetListProductsByTagUuidUseCase {
    constructor(private getProducts: IControllerGetListProducts) { }
    execute(tagUuid: string): IProduct[] {
        const products = this.getProducts.handle();
        return products.filter(product => product.tag === tagUuid);
    }
}