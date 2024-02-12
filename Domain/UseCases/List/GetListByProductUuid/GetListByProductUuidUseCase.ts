import { IList } from "../../../Model/IList";
import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IControllerGetLists } from "../../interface/IController";

export default class GetListByProductUuidUseCase {
    constructor(private mmkv: IMMKVStorage,private getList: IControllerGetLists) { }
    execute(productUuid:string): string[]{
        const list = this.getList.handle();
        const returnList:string[] = [];
        list?.map(list => {if(list.items.includes(productUuid)) returnList.push(list.uuid) })
        return returnList;
    }
}