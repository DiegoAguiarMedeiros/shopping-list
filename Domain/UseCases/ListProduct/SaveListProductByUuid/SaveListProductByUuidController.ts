import { IProduct } from "../../../Model/IProduct";
import { IList, IListInterface } from "../../../Model/IList";
import SaveListByUuidUseCase from "./SaveListProductByUuidUseCase";

export default class SaveListProductByUuidController {
  constructor(private SaveListByUuidUseCase: SaveListByUuidUseCase) { }

  handle = (data: IProduct): void => {
    try {
      this.SaveListByUuidUseCase.execute(data.uuid, data);
    } catch (err) {
      console.error("SaveListProductByUuidController: ", err);
    }
  };
}
