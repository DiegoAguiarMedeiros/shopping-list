import { IList, IListInterface } from "../../../Model/IList";
import { IControllerGetListByUuid } from "../../interface/IController";
import GetListByUuidUseCase from "./GetListByUuidUseCase";

export default class GetListByUuidController implements IControllerGetListByUuid {
  constructor(private getListByUuidUseCase: GetListByUuidUseCase) { }

  handle = (uuid: string): IList => {
    try {
      const result = this.getListByUuidUseCase.execute(uuid);

      return result;

    } catch (err) {
      console.error("GetListByUuidController: ", err);
      const result: IList = {
        uuid: "",
        name: "",
        tags: [],
        items: [],
        createAt: 0
      };
      return result;
    }
  };
}
