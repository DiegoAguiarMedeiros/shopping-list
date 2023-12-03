import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";

export default class GetQuantityWithoutAmountByListUuidController {
    constructor(private getTotalQuantityWithoutAmountByListUuidUseCase: GetTotalQuantityWithoutAmountByListUuidUseCase) { }
    handle(listUuid: string): number {
        return this.getTotalQuantityWithoutAmountByListUuidUseCase.execute(listUuid)
    }
}