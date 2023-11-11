import { ITagInterface } from "../../../Model/ITag";
import GetTagByUuidUseCase from "./GetTagByUuidUseCase";

export default class GetTagByUuidController {
  constructor(private getTagByUuidUseCase: GetTagByUuidUseCase) { }

  handle = (uuid: string): ITagInterface | null => {
    try {
      const result = this.getTagByUuidUseCase.execute(uuid);

      if (result) {
        return result;
      }

      return null;
    } catch (err) {
      console.error("GetTagByUuidController: ", err);
      return null;
    }
  };
}
