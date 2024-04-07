import Product from "../../../Model/Implementation/Product";
import AddProductToListByUuidUseCase from "./AddProductToListByUuidUseCase";

export default class AddProductToListByUuidController {

    constructor(private addProductToListByUuidUseCase: AddProductToListByUuidUseCase) { }
    handle(listUuid: string, productsUuid: string) {
        try {
            this.addProductToListByUuidUseCase.execute(listUuid, productsUuid);
        } catch (err) {
            console.error("AddProductToListByUuidController: ", err);
        }
    }
}