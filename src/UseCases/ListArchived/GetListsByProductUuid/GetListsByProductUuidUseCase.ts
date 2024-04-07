import { sortArrayOfObjects } from "../../../../utils/functions";
import { IList } from "../../../Model/IList";
import { IControllerGetLists } from "../../interface/IController";

export default class GetListsByProductUuidUseCase {
    constructor(private getLists:IControllerGetLists){}
    execute(productsUuid: string): IList[]{
        return sortArrayOfObjects(this.getLists.handle().filter((list) => list.items.includes(productsUuid)),'createAt');
    }
}