import IAmount from "../../../Model/IAmount";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";

export default class GetQuantityAmountByListUuidController {
    constructor(private getTotalQuantityAmountByListUuidUseCase: GetTotalQuantityAmountByListUuidUseCase) { }
    handle(listUuid: string): number {
        return this.getTotalQuantityAmountByListUuidUseCase.execute(listUuid)
    }
}