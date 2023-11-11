import ITag, { ITagInterface } from "../../../Model/ITag";
import SaveTagByUuidUseCase from "./SaveTagByUuidUseCase";

export default class SaveTagByUuidController {
  constructor(private SaveTagByUuidUseCase: SaveTagByUuidUseCase) { }

  handle = (data: ITag): void => {
    try {
      this.SaveTagByUuidUseCase.execute(data.uuid, data);
    } catch (err) {
      console.error("SaveTagByUuidController: ", err);
    }
  };
}
