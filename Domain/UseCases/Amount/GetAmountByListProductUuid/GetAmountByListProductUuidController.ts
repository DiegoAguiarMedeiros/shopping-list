import IAmount from "../../../Model/IAmount";
import GetAmountByListProductUuidUseCase from "./GetAmountByListProductUuidUseCase";

export default class GetAmountByListProductUuidController {
    constructor(private getAmountByListProductUuidUseCase: GetAmountByListProductUuidUseCase) { }
    handle(key: string): IAmount[] {
        return this.getAmountByListProductUuidUseCase.execute(key)
    }
}