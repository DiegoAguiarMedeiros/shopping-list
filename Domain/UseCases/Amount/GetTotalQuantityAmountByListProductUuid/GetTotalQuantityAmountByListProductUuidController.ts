import GetTotalQuantityAmountByListProductUuidUseCase from "./GetTotalQuantityAmountByListProductUuidUseCase";

export default class GetQuantityAmountByListProductUuidController {
    constructor(private getTotalQuantityAmountByListProductUuidUseCase: GetTotalQuantityAmountByListProductUuidUseCase) { }
    handle(key: string): number {
        return this.getTotalQuantityAmountByListProductUuidUseCase.execute(key)
    }
}