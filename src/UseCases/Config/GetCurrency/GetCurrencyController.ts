
import GetCurrencyUseCase from "./GetCurrencyUseCase";

export default class GetCurrencyController {
    constructor(private getCurrencyUseCase:GetCurrencyUseCase){}
    handle():string{
        return this.getCurrencyUseCase.execute('SLSHOPPINGCURRENCY')
    }
}