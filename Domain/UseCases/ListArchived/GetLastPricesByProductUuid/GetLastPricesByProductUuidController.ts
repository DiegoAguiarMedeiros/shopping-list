import GetLastPricesByProductUuidUseCase from "./GetLastPricesByProductUuidUseCase";

export default class GetLastPricesByProductUuidController {
    constructor(private getLastPricesByProductUuidUseCase:GetLastPricesByProductUuidUseCase){}
    handle(productUuid: string): string[]{
        return this.getLastPricesByProductUuidUseCase.execute(productUuid)
    }
}