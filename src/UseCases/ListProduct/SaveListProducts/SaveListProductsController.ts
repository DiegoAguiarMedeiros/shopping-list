import SaveListProductsUseCase from "./SaveListProductsUseCase";
import { IControllerSaveListProduct } from "../../interface/IController";
import { IListInterface } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";

export default class SaveListProductsController implements IControllerSaveListProduct {
  constructor(private saveListProductsUseCase: SaveListProductsUseCase) {}

  handle = (data: string[]): void => {
    try {
      this.saveListProductsUseCase.execute("SLSHOPPINGLISTPRODUCT", data);
    } catch (err) {
      console.error("SaveListProductsController: ", err);
    }
  };
}

