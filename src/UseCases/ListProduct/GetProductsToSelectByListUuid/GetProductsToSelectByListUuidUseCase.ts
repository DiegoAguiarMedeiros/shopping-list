import { Children } from "react";
import { ITagsProductsMultiSelect } from "../../../Model/IProduct";
import Product from "../../../screens/product";
import { ISortArrayOfObjects } from "../../../utils/functions";
import {
  IControllerGetAllProductsTinyByTagUuid,
  IControllerGetListByUuid,
  IControllerGetTagsObject,
} from "../../interface/IController";

export default class GetProductsToSelectByListUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private getAllTagsController: IControllerGetTagsObject,
    private IControllerGetAllProductsTinyByTagUuid: IControllerGetAllProductsTinyByTagUuid,
    private sortArrayOfObjects: ISortArrayOfObjects,
    private i18n: any
  ) {}
  execute = (listUuid: string): ITagsProductsMultiSelect[] => {
    try {
      const list = this.getListByUuid.handle(listUuid);
      const listTags = this.getAllTagsController.handle();
      const data: ITagsProductsMultiSelect[] = [];
      listTags.forEach((tag) => {
        const product = this.IControllerGetAllProductsTinyByTagUuid.handle(
          tag.uuid
        );

        const filteredProduct = product.filter(
          (product) => !list.items.includes(product.id)
        );

        if (filteredProduct.length > 0) {
          data.push({
            id: tag.uuid,
            name: tag.name,
            children: filteredProduct,
          });
        }
      });
      return this.sortArrayOfObjects(data, "name");
    } catch (error) {
      console.error("GetAllProductsObjectUseCase", error);
      return [];
    }
  };
}
