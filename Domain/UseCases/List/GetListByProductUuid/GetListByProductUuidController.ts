import { IList } from "../../../Model/IList";
import GetListByProductUuidUseCase from "./GetListByProductUuidUseCase";

export default class GetListByProductUuidController {
    constructor(private getListByProductUuidUseCase:GetListByProductUuidUseCase){}
    handle(productUuid:string): string[]{
        return this.getListByProductUuidUseCase.execute(productUuid)
    }
}