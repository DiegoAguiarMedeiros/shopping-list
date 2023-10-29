import { IListInterface } from "../../../Model/IList";
import GetListByUuidUseCase from "./GetListByUuidUseCase";

export default class GetListByUuidController {
  constructor(private getListByUuidUseCase: GetListByUuidUseCase) {}

  handle = async (uuid: string): Promise<IListInterface | null> => {
    try {
      const result = await this.getListByUuidUseCase.execute(uuid);

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
