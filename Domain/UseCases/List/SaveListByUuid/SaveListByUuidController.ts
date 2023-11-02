import IList, { IListInterface } from "../../../Model/IList";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";

export default class SaveListByUuidController {
  constructor(private SaveListByUuidUseCase: SaveListByUuidUseCase) {}

  handle = (data: IList): void => {
    try {
      this.SaveListByUuidUseCase.execute(data.uuid, data);
    } catch (err) {
      console.error("SaveListByUuidController: ", err);
    }
  };
}
