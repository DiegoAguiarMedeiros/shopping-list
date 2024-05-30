import { IControllerGetListByUuid, IControllerGetTagByProductsUuid, IControllerSaveListByUuid } from "../../interface/IController";


export default class AddProductToListByUuidUseCase {
  constructor(
    private getListByUuid: IControllerGetListByUuid,
    private saveListByUuid: IControllerSaveListByUuid,
    private getTag: IControllerGetTagByProductsUuid
  ) {}

  execute(listUuid: string, productsUuid: string[]) {
    const list = this.getListByUuid.handle(listUuid);
    const newItems = list.items.concat(productsUuid);
    list.items = newItems;
    productsUuid.forEach((productUuid) => {
      const tags = this.getTag.handle(productUuid);
      if (!list.tags.includes(tags)) {
        list.tags.push(tags);
      }
    });
    this.saveListByUuid.handle(list);
  }
}