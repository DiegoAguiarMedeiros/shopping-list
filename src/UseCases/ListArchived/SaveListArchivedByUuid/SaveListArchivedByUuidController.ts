import { IList, IListInterface } from "../../../Model/IList";
import SaveListByUuidUseCase from "./SaveListArchivedByUuidUseCase";

export default class SaveListByUuidController {
  constructor(private SaveListByUuidUseCase: SaveListByUuidUseCase) {}

  handle = (list: string): void => {
    try {
      this.SaveListByUuidUseCase.execute(list);
    } catch (err) {
      console.error("SaveListByUuidController: ", err);
    }
  };
}
