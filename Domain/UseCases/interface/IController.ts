import { ITagInterface } from "../../Model/ITag";
import { IListInterface } from "../../Model/IList";

export default interface IController {
  handle(data: IListInterface | ITagInterface): void;
}
