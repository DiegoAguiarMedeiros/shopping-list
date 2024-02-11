
import { ColorList } from "../../../../constants/Colors";
import GetColorUseCase from "./GetColorUseCase";

export default class GetColorController {
    constructor(private getColorUseCase:GetColorUseCase){}
    handle():ColorList{
        return this.getColorUseCase.execute('SLSHOPPINGCOLOR')
    }
}