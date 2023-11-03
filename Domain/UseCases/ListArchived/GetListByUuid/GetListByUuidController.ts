import { IListInterface } from "../../../Model/IList";
import GetListByUuidUseCase from "./GetListByUuidUseCase";

export default class GetListByUuidController {
  constructor(private getListByUuidUseCase: GetListByUuidUseCase) { }

  handle = (uuid: string): IListInterface | null => {
    try {
      const result = this.getListByUuidUseCase.execute(uuid);

      if (result) {
        return result;
      }

      return null;
    } catch (err) {
      console.error("GetListByUuidController: ", err);
      return null;
    }
  };
}
