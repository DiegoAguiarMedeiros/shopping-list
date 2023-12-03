import IAmount from "../../../Model/IAmount";
import GetAmountByListProductUuidUseCase from "./GetTotalAmountByListProductUuidUseCase";

export default class GetAmountByListProductUuidController {
    constructor(private getAmountByListProductUuidUseCase: GetAmountByListProductUuidUseCase) { }
    handle(key: string): number {
        return this.getAmountByListProductUuidUseCase.execute(key)
    }
}