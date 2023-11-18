import { IList, IListInterface } from "../../../Model/IList";
import SaveListsUseCase from "./SaveListsUseCase";
import { IControllerSaveList } from "../../interface/IController";

export default class SaveListsController implements IControllerSaveList {
  constructor(private SaveListsUseCase: SaveListsUseCase) { }

  handle = (data: IListInterface<IList>): void => {
    try {
      this.SaveListsUseCase.execute('SLSHOPPINGLIST', data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}

