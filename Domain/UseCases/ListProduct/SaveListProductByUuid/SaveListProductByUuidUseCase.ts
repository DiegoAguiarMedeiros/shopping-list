import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetListProducts, IControllerSaveListProduct } from "../../interface/IController";
import { IProduct } from "../../../Model/IProduct";
import { convertToInterface } from "../../../../utils/functions";

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
      console.log('lists', lists)
      console.log('data', data)
      if (lists) {
        lists.push(data);
        const newListInterface: IListInterface<IProduct> = convertToInterface(lists);
        console.log('newListInterface', newListInterface)
        this.saveListProducts.handle(newListInterface);
      } else {
        const newListInterface: IListInterface<IProduct> = {}
        newListInterface[data.uuid] = data;
        this.saveListProducts.handle(newListInterface);
      }
    } catch (error) {
      console.error("SaveListProductByUuidUseCase", error);
    }
  };
}
