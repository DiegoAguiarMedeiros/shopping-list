import { IList, IListInterface } from "../../../Model/IList";
import { IControllerSaveListByUuid } from "../../interface/IController";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";

export default class SaveListByUuidController implements IControllerSaveListByUuid {
  constructor(private SaveListByUuidUseCase: SaveListByUuidUseCase) { }

  handle = (data: IList): void => {
    try {
      this.SaveListByUuidUseCase.execute(data.uuid, data);
    } catch (err) {
      console.error("SaveListByUuidController: ", err);
    }
  };
}
