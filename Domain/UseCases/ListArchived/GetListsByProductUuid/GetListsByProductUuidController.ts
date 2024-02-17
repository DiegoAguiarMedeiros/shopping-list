import { IList } from "../../../Model/IList";
import GetListsByProductUuidUseCase from "./GetListsByProductUuidUseCase";

export default class GetListsByProductUuidController {
    constructor(private getListsByProductUuidUseCase:GetListsByProductUuidUseCase){}
    handle(productsUuid: string): IList[]{
        return this.getListsByProductUuidUseCase.execute(productsUuid)
    }
}