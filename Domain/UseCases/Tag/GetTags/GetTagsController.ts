import ITag from "../../../Model/ITag";
import GetTagsUseCase from "./GetTagsUseCase";

export default class GetTagsController {
  constructor(private getTagsUseCase: GetTagsUseCase) { }

  handle = (): ITag[] => {
    try {
      const result = this.getTagsUseCase.execute("SLSHOPPINGTAG");
      let data: ITag[];
      result ? (data = Object.values(result)) : (data = []);
      return data;
    } catch (err) {
      console.error("GetTagsController: ", err);
      return [];
    }
  };
}
