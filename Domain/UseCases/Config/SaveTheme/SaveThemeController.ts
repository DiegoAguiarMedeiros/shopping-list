import SaveThemeUseCase from "./SaveThemeUseCase";

export default class SaveThemeController{
    constructor(private saveThemeUseCase:SaveThemeUseCase){}
    handle(theme: "light" | "dark"){
        this.saveThemeUseCase.execute('SLSHOPPINGTHEME', theme)
    }
}