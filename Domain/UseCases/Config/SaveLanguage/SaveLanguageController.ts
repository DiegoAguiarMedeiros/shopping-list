import { languageType } from "../../../../types/types";
import SaveLanguageUseCase from "./SaveLanguageUseCase";

export default class SaveLanguageController{
    constructor(private saveLanguageUseCase:SaveLanguageUseCase){}
    handle(Language: languageType){
        this.saveLanguageUseCase.execute('SLSHOPPINGLANGUAGE', Language)
    }
}