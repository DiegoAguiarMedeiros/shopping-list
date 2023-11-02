import IList, { IListInterface } from "../../../Model/IList";
import SaveListsUseCase from "./SaveListsUseCase";
import ISaveListsController from "../../interface/IController";

export default class SaveListsController implements ISaveListsController {
  constructor(private SaveListsUseCase: SaveListsUseCase) {}

  handle = (data: IList): void => {
    try {
      this.SaveListsUseCase.execute(data.uuid, data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}
