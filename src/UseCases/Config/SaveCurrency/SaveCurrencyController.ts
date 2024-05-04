
import SaveCurrencyUseCase from "./SaveCurrencyUseCase";

export default class SaveCurrencyController{
    constructor(private saveCurrencyUseCase:SaveCurrencyUseCase){}
    handle(currency: string){
        this.saveCurrencyUseCase.execute('SLSHOPPINGCURRENCY', currency)
    }
}