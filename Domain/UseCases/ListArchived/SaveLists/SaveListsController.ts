import { IListInterface } from "../../../Model/IList";
import SaveListsUseCase from "./SaveListsUseCase";
import IController from "../../interface/IController";

export default class SaveListsController implements IController {
  constructor(private SaveListsUseCase: SaveListsUseCase) { }

  handle = (data: IListInterface<IList>): void => {
    try {
      this.SaveListsUseCase.execute('SLSHOPPINGLISTARCHIVED', data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}

