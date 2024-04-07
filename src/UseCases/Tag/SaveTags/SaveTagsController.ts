import SaveTagsUseCase from "./SaveTagsUseCase";
import { IControllerSaveTag } from "../../interface/IController";

export default class SaveTagsController implements IControllerSaveTag {
  constructor(private saveTagsUseCase: SaveTagsUseCase) {}

  handle = (data: string[]): void => {
    try {
      this.saveTagsUseCase.execute("SLSHOPPINGTAG", data);
    } catch (err) {
      console.error("SaveTagsController: ", err);
    }
  };
}
