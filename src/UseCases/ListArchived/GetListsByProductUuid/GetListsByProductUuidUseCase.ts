import { sortArrayOfObjects } from "../../../utils/functions";
import { IList } from "../../../Model/IList";
import {
  IControllerGetLists,
  IControllerGetListByUuid,
} from "../../interface/IController";

export default class GetListsByProductUuidUseCase {
  constructor(
    private getLists: IControllerGetLists,
    private getListByUuid: IControllerGetListByUuid
  ) {}
  execute(productsUuid: string): IList[] {
    const list = this.getLists.handle();
    const returnList: IList[] = [];
    list.forEach((l) => {
      const list = this.getListByUuid.handle(l);
      if (list.items.includes(productsUuid)) returnList.push(list);
    });

    return returnList;
  }
}
