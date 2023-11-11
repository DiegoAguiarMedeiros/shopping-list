import { ITagInterface } from "../../../Model/ITag";
import SaveTagsUseCase from "./SaveTagsUseCase";
import IController from "../../interface/IController";

export default class SaveListsController implements IController {
  constructor(private saveTagsUseCase: SaveTagsUseCase) { }

  handle = (data: ITagInterface): void => {
    try {
      this.saveTagsUseCase.execute('SLSHOPPINGTAG', data);
    } catch (err) {
      console.error("SaveListsController: ", err);
    }
  };
}

