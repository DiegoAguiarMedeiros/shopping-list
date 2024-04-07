import { sortArrayOfObjects } from "../../../../utils/functions";
import ITag from "../../../Model/ITag";
import GetTagsUseCase from "./GetTagsUseCase";

export default class GetTagsController {
  constructor(private getTagsUseCase: GetTagsUseCase) {}

  handle = (): string[] => {
    try {
      return this.getTagsUseCase.execute("SLSHOPPINGTAG");
    } catch (err) {
      console.error("GetTagsController: ", err);
      return [];
    }
  };
}
