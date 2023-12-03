import GetTagUuidByTagNameUseCase from "./GetTagUuidByTagNameUseCase";

export default class GetTagUuidByTagNameController {
    constructor(private getTagUuidByTagNameUseCase: GetTagUuidByTagNameUseCase) { }
    handle(name: string): string {
        return this.getTagUuidByTagNameUseCase.execute(name);
    }
}