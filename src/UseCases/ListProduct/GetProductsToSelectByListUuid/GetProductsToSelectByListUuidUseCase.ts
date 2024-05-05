import { IProduct } from "../../../Model/IProduct";
import Product from "../../../screens/product";
import { ISortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetAllProducts,
  IControllerGetListByUuid,
  IControllerGetProductsByUuid,
} from "../../interface/IController";

export default class GetProductsToSelectByListUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private getAllProductsController: IControllerGetAllProducts,
    private getProduct: IControllerGetProductsByUuid,
    private sortArrayOfObjects: ISortArrayOfObjects,
    private i18n: any
  ) {}
  execute = (listUuid: string): IProduct[] => {
    try {
      const list = this.getListByUuid.handle(listUuid);
      const listProducts = this.getAllProductsController.handle();
      const data = listProducts.filter(
        (product) => !list.items.includes(product)
      );
      if (data.length > 0) {
        const list: IProduct[] = [];
        data.forEach((product) => {
          const p = this.getProduct.handle(product);
          if (p) list.push(p);
        });
        return [
          {
            name: this.i18n.t("selectProduct"),
            uuid: "",
            amount: [],
            tag: "",
            unit: "Un",
          },
          ...this.sortArrayOfObjects(list, "name"),
        ];
      }
      return [
        {
          name: this.i18n.t("noProducts"),
          uuid: "",
          amount: [],
          tag: "",
          unit: "Un",
        },
      ];
    } catch (error) {
      console.error("GetAllProductsObjectUseCase", error);
      return [
        {
          name: this.i18n.t("noProducts"),
          uuid: "",
          amount: [],
          tag: "",
          unit: "Un",
        },
      ];
    }
  };
}
