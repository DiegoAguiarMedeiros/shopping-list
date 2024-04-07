
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveCurrencyUseCase{

    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string,currency: string){
        try {
            this.MMKVStorage.set(key, currency);
          } catch (error) {
            console.error("SaveCurrencyUseCase", error);
          }
    }
}