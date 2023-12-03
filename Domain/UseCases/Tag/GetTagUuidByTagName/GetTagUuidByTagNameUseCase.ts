import { IControllerGetTags } from "../../interface/IController";

export default class GetTagUuidByTagNameUseCase {

    constructor(private getTags: IControllerGetTags) { }

    execute(name: string): string {
        const tags = this.getTags.handle().filter(tag => tag.name === name);
        return tags[0].uuid;
    }
}