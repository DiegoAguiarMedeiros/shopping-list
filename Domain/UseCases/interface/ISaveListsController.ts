import { IListInterface } from "../../Model/IList";

export default interface ISaveListsController {
  handle(data: IListInterface): void;
}
