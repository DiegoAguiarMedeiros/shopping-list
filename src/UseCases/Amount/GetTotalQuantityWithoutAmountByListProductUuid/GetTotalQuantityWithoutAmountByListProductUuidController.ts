import GetTotalQuantityWithoutAmountByListProductUuidUseCase from "./GetTotalQuantityWithoutAmountByListProductUuidUseCase";

export default class GetQuantityWithoutAmountByListProductUuidController {
    constructor(private getTotalQuantityWithoutAmountByListProductUuidUseCase: GetTotalQuantityWithoutAmountByListProductUuidUseCase) { }
    handle(key: string): number {
        return this.getTotalQuantityWithoutAmountByListProductUuidUseCase.execute(key)
    }
}