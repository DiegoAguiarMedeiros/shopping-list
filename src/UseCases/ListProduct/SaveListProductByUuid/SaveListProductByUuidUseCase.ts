import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import {
  IControllerGetAllProducts,
  IControllerSaveListProduct,
} from "../../interface/IController";
import { IProduct } from "../../../Model/IProduct";
import { convertToInterface } from "../../../utils/functions";

export default class SaveListProductByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveListProducts: IControllerSaveListProduct,
    private getListProducts: IControllerGetAllProducts
  ) {}

  execute = (key: string, data: IProduct): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const lists = this.getListProducts.handle();
      if (!lists.includes(data.uuid))
        this.saveListProducts.handle([...lists, data.uuid]);
    } catch (error) {
      console.error("SaveListProductByUuidUseCase", error);
    }
  };
}
