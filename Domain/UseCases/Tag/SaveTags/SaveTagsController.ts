import { ITagInterface } from "../../../Model/ITag";
import SaveListsUseCase from "./SaveTagsUseCase";
import IController from "../../interface/IController";

export default class SaveListsController implements IController {
  constructor(private SaveListsUseCase: SaveListsUseCase) { }

  handle = (data: ITagInterface): void => {
    try {
      this.SaveListsUseCase.execute('SLSHOPPINGLIST', data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}

