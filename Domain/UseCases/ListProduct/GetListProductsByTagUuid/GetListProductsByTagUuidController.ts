import { IProduct } from "../../../Model/IProduct";
import GetListProductsByTagUuidUseCase from "./GetListProductsByTagUuidUseCase";

export default class GetListProductsByTagUuidController {
    constructor(private GetListProductsByTagUuidUseCase: GetListProductsByTagUuidUseCase){}
    handle(tagUuid: string): IProduct[]{
        return this.GetListProductsByTagUuidUseCase.execute(tagUuid);
    }
}