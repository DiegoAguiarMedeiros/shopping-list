import { IControllerDelete } from "../../interface/IController";
import RemoveListByUuidUseCase from "./RemoveListByUuidUseCase";

export default class RemoveListByUuidController implements IControllerDelete {
  constructor(private removeListByUuidUseCase: RemoveListByUuidUseCase) {}
  handle(listUuid: string) {
    this.removeListByUuidUseCase.execute(listUuid);
  }
}
