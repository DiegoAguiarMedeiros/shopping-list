import DeleteProductFromListByUuidUseCase from "./DeleteProductFromListByUuidUseCase";

export default class DeleteProductFromListByUuidController {

    constructor(private deleteProductFromListByUuidUseCase: DeleteProductFromListByUuidUseCase) { }

    handle(listId: string, productId: string): void {
        this.deleteProductFromListByUuidUseCase.excecute(listId, productId)
    }
}