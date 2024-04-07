import ITag from "../../../Model/ITag";
import GetTagByUuidUseCase from "./GetTagByUuidUseCase";

export default class GetTagByUuidController {
  constructor(private getTagByUuidUseCase: GetTagByUuidUseCase) { }

  handle = (uuid: string): ITag => {
    try {
      const result = this.getTagByUuidUseCase.execute(uuid);
      if (result) {
        return result;
      }

      return {
        uuid: "",
        name: "",
      };
    } catch (err) {
      console.error("GetTagByUuidController: ", err);
      return {
        uuid: "",
        name: "",
      };
    }
  };
}
