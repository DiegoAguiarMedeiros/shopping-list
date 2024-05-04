import { IList, IListInterface } from "../../../Model/IList";
import GetListByUuidUseCase from "./GetListByUuidUseCase";

export default class GetListByUuidController {
  constructor(private getListByUuidUseCase: GetListByUuidUseCase) {}

  handle = (uuid: string): IList => {
    try {
      return this.getListByUuidUseCase.execute(uuid);
    } catch (err) {
      console.error("GetListByUuidController: ", err);
      return null;
    }
  };
}
