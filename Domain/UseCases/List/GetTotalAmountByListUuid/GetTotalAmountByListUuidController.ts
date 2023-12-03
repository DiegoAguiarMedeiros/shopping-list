import GetAmountByListUuidUseCase from "./GetTotalAmountByListUuidUseCase";

export default class GetAmountByListUuidController {
    constructor(private getAmountByListUuidUseCase: GetAmountByListUuidUseCase) { }

    handle(listUuid: string): number {
        return this.getAmountByListUuidUseCase.execute(listUuid)
    }
}