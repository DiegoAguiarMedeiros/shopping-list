import { IListInterface } from "../../../Model/IList";
import SaveListsUseCase from "./SaveListsUseCase";
import ISaveListsController from "../../interface/ISaveListsController";

export default class SaveListsController implements ISaveListsController {
  constructor(private SaveListsUseCase: SaveListsUseCase) { }

  handle = (data: IListInterface): void => {
    try {
      this.SaveListsUseCase.execute('SLSHOPPINGLISTARCHIVED', data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}

