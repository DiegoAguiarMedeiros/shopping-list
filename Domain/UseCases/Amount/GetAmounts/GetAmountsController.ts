import IAmount from "../../../Model/IAmount";
import { IControllerGetAmounts } from "../../interface/IController";
import GetAmountsUseCase from "./GetAmountsUseCase";

export default class GetAmountsController implements IControllerGetAmounts {
    constructor(private getAmountsUseCase: GetAmountsUseCase) { }

    handle = (): IAmount[] => {
        try {
            const result = this.getAmountsUseCase.execute("SLSHOPPINGAMOUNT");
            let data: IAmount[];
            result ? (data = Object.values(result)) : (data = []);
            return data;
        } catch (err) {
            console.error("GetAmountsController: ", err);
            return [];
        }
    };
}