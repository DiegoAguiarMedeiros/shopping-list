import { IProduct } from "../../../Model/IProduct";
import GetAmountByListUuidUseCase from "./GetTotalAmountByListUuidUseCase";

export default class GetAmountByListUuidController {
    constructor(private getAmountByListUuidUseCase: GetAmountByListUuidUseCase) { }

    handle(listUuid: string, productsList?: IProduct[]): number {
        return this.getAmountByListUuidUseCase.execute(listUuid, productsList)
    }
}