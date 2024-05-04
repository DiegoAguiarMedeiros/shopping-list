import ITag from "../../../Model/ITag";
import IStorage from "../../../Service/IMMKVStorage";
import {
  IControllerGetTagByUuid,
  IControllerGetTags,
} from "../../interface/IController";

export default class GetTagsObjectUseCase {
  constructor(
    private getTags: IControllerGetTags,
    private getTagsByUuid: IControllerGetTagByUuid
  ) {}

  execute = (): ITag[] => {
    try {
      const data = this.getTags.handle();
      const result: ITag[] = [];
      data.forEach((l) => {
        result.push(this.getTagsByUuid.handle(l));
      });
      return result;
    } catch (error) {
      console.error("GetTagsObjectUseCase", error);
      return [];
    }
  };
}
