import { sortArrayOfObjects } from "../../../../utils/functions";
import ITag from "../../../Model/ITag";
import GetTagsUseCase from "./GetTagsUseCase";

export default class GetTagsController {
  constructor(private getTagsUseCase: GetTagsUseCase) { }

  handle = (): ITag[] => {
    try {
      const result = this.getTagsUseCase.execute("SLSHOPPINGTAG");
      let data: ITag[] = sortArrayOfObjects(Object.values(result), "name");
      return result ? data : [];
    } catch (err) {
      console.error("GetTagsController: ", err);
      return [];
    }
  };
}
