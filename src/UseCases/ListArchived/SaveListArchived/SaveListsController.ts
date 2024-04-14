import SaveListsUseCase from "./SaveListsUseCase";
import { IControllerSaveList } from "../../interface/IController";

export default class SaveListsController implements IControllerSaveList {
  constructor(private SaveListsUseCase: SaveListsUseCase) {}

  handle = (data: string[]): void => {
    try {
      this.SaveListsUseCase.execute("SLSHOPPINGLISTARCHIVED", data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}
