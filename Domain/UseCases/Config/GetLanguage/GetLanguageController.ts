import { languageType } from "../../../../types/types";
import GetLanguageUseCase from "./GetLanguageUseCase";

export default class GetLanguageController {
    constructor(private getLanguageUseCase:GetLanguageUseCase){}
    handle():languageType{
        return this.getLanguageUseCase.execute('SLSHOPPINGLANGUAGE')
    }
}