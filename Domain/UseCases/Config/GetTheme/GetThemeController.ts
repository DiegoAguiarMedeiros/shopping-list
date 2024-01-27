import GetThemeUseCase from "./GetThemeUseCase";

export default class GetThemeController {
    constructor(private getThemeUseCase:GetThemeUseCase){}
    handle():string{
        return this.getThemeUseCase.execute('SLSHOPPINGTHEME')
    }
}