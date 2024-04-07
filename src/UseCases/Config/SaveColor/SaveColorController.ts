
import SaveColorUseCase from "./SaveColorUseCase";

export default class SaveColorController{
    constructor(private saveColorUseCase:SaveColorUseCase){}
    handle(Color: string){
        this.saveColorUseCase.execute('SLSHOPPINGCOLOR', Color)
    }
}