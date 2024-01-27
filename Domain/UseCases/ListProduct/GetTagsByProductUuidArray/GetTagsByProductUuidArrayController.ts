import GetTagsUseCase from "./GetTagsByProductUuidArrayUseCase";

export default class GetTagsByProductUuidArrayController {
    constructor(private getTagsUseCase: GetTagsUseCase) { }
    handle(productId: string[]): string[] {
        return this.getTagsUseCase.execute(productId)
    }
}