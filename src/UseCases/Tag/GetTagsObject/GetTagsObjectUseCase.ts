import ITag from "../../../Model/ITag";
import { ISortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetTagByUuid,
  IControllerGetTags,
} from "../../interface/IController";

export default class GetTagsObjectUseCase {
  constructor(
    private getTags: IControllerGetTags,
    private getTagsByUuid: IControllerGetTagByUuid,
    private sortArrayOfObjects: ISortArrayOfObjects
  ) {}

  execute = (): ITag[] => {
    try {
      const data = this.getTags.handle();
      const result: ITag[] = [];
      data.forEach((l) => {
        result.push(this.getTagsByUuid.handle(l));
      });
      return this.sortArrayOfObjects(result, "name");
    } catch (error) {
      console.error("GetTagsObjectUseCase", error);
      return [];
    }
  };
}
