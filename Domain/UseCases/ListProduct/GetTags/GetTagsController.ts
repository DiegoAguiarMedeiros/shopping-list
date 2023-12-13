import GetTagsUseCase from "./GetTagsUseCase";

export default class GetTagsController {
    constructor(private getTagsUseCase: GetTagsUseCase) { }
    handle(productId: string[]): string[] {
        return this.getTagsUseCase.execute(productId)
    }
}