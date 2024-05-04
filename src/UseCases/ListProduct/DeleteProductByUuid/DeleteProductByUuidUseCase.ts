import IMMKVStorage from "../../../Service/IMMKVStorage";
import Product from "../../../Model/Implementation/Product"
import { IListInterface } from "../../../Model/IList";
import { IControllerSaveListProduct } from "../../interface/IController";
import { IProduct } from "../../../Model/IProduct";

export default class DeleteProductUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveProducts: IControllerSaveListProduct) { }

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      const ProductsStringOrNull = this.mmkv.get('SLSHOPPINGLISTPRODUCT');
      if (ProductsStringOrNull) {
        const Products: IListInterface<IProduct> = ProductsStringOrNull ? JSON.parse(ProductsStringOrNull) : ProductsStringOrNull;
        delete Products[key];
        this.saveProducts.handle(Products);
      }
    } catch (error) {
      console.error("DeleteProductUseCase", error);
    }
  };
}
