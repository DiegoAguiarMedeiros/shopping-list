import { IControllerGetTagByProductsUuid } from "../../interface/IController";
import GetTagByProductUuidUseCase from "./GetTagByProductUuidUseCase";

export default class GetTagByProductUuidControler implements IControllerGetTagByProductsUuid {

    constructor(private getTagByProductUuidUseCase: GetTagByProductUuidUseCase) { }

    handle(key: string): string {
        return this.getTagByProductUuidUseCase.execute(key);
    }
} 