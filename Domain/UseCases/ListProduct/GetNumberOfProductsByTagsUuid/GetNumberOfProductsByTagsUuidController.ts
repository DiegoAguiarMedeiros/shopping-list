import GetNumberOfProductsByTagsUuidUseCase from "./GetNumberOfProductsByTagsUuidUseCase";

export default class GetNumberOfProductsByTagsUuidController {
    constructor(private GetNumberOfProductsByTagsUuidUseCase: GetNumberOfProductsByTagsUuidUseCase) { }
    handle(tagUuid: string): number {
        return this.GetNumberOfProductsByTagsUuidUseCase.execute(tagUuid)
    }
}