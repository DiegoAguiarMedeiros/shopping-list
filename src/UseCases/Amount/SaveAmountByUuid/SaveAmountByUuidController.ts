import IAmount from "../../../Model/IAmount";
import { IListInterface } from "../../../Model/IList";
import { IControllerSaveAmountByUuid } from "../../interface/IController";
import SaveAmountByUuidUseCase from "./SaveAmountByUuidUseCase";

export default class SaveAmountByUuidController implements IControllerSaveAmountByUuid {
    constructor(private saveAmountByUuidUseCase: SaveAmountByUuidUseCase) { }
    handle = (data: IAmount): void => {
        try {
            this.saveAmountByUuidUseCase.execute(data);
        } catch (err) {
            console.error("SaveAmountByUuidController: ", err);
        }
    };
}