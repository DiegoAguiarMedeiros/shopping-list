import { IListInterface } from "../../../Model/IList";
import SaveListsUseCase from "./SaveListsUseCase";

export default class SaveListsController {
  constructor(private saveListsUseCase: SaveListsUseCase) {}

  handle = (data: any): void => {
    try {
      this.saveListsUseCase.execute("SLSHOPPINGLIST", data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}
