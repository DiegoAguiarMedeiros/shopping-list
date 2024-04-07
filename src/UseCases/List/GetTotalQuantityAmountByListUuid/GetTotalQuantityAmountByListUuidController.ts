import { IProduct } from "../../../Model/IProduct";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";

export default class GetQuantityAmountByListUuidController {
    constructor(private getTotalQuantityAmountByListUuidUseCase: GetTotalQuantityAmountByListUuidUseCase) { }
    handle(listUuid: string, productsList?: IProduct[]): number {
        return this.getTotalQuantityAmountByListUuidUseCase.execute(listUuid, productsList)
    }
}