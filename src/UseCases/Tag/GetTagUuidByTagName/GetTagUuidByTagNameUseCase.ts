import { IControllerGetTagsObject } from "../../interface/IController";

export default class GetTagUuidByTagNameUseCase {
  constructor(private getTagsObject: IControllerGetTagsObject) {}

  execute(name: string): string {
    const tags = this.getTagsObject.handle().filter((tag) => tag.name === name);
    return tags[0].uuid;
  }
}
