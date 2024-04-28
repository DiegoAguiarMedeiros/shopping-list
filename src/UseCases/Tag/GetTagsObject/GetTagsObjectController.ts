import { sortArrayOfObjects } from "../../../utils/functions";
import ITag from "../../../Model/ITag";
import GetTagsObjectUseCase from "./GetTagsObjectUseCase";

export default class GetTagsObjectController {
  constructor(private getTagsObjectUseCase: GetTagsObjectUseCase) {}

  handle = (): ITag[] => {
    try {
      return this.getTagsObjectUseCase.execute();
    } catch (err) {
      console.error("GetTagsObjectController: ", err);
      return [];
    }
  };
}
