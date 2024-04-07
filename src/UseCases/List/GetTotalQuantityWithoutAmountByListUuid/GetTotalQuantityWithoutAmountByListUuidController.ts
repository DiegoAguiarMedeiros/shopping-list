import { IProduct } from "../../../Model/IProduct";
import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";

export default class GetQuantityWithoutAmountByListUuidController {
    constructor(private getTotalQuantityWithoutAmountByListUuidUseCase: GetTotalQuantityWithoutAmountByListUuidUseCase) { }
    handle(listUuid: string, productsList?: IProduct[]): number {
        return this.getTotalQuantityWithoutAmountByListUuidUseCase.execute(listUuid, productsList)
    }
}