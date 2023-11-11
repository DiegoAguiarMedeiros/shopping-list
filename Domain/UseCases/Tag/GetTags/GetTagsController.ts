import ITag from "../../../Model/ITag";
import GetTagsUseCase from "./GetTagsUseCase";

export default class GetTagsController {
  constructor(private getTagsUseCase: GetTagsUseCase) { }

  handle = (): ITag[] | null => {
    try {
      const result = this.getTagsUseCase.execute("SLSHOPPINGTAG");
      console.log('result', result)
      let data: ITag[] | null;
      result ? (data = Object.values(result)) : (data = null);
      return data;
    } catch (err) {
      console.error("GetTagsController: ", err);
      return null;
    }
  };
}
