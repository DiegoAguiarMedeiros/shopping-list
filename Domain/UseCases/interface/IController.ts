import IList from "../../Model/IList";

export default interface IController {
  handle(data: IList): void;
}
