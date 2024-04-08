import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetListProducts, IControllerSaveListProduct } from "../../interface/IController";
import { IProduct } from "../../../Model/IProduct";
import { convertToInterface } from "../../../utils/functions";

export default class SaveListProductByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveListProducts: IControllerSaveListProduct,
    private getListProducts: IControllerGetListProducts
  ) { }

  execute = (key: string, data: IProduct): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const lists = this.getListProducts.handle();
      this.saveListProducts.handle([...lists, data.uuid]);
    } catch (error) {
      console.error("SaveListProductByUuidUseCase", error);
    }
  };
}
