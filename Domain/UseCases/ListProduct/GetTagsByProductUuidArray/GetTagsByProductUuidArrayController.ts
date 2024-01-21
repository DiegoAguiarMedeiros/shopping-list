import GetTagsUseCase from "./GetTagsByProductUuidArrayUseCase";

export default class GetTagsByProductUuidArrayController {
    constructor(private getTagsUseCase: GetTagsUseCase) { }
    handle(productId: string[]): string[] {
        console.log("GetTagsByProductUuidArrayController")
        return this.getTagsUseCase.execute(productId)
    }
}