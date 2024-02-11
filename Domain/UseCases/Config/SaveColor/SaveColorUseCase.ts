
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveColorUseCase{

    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string,color: string){
        try {
            this.MMKVStorage.set(key, color);
          } catch (error) {
            console.error("SaveColorUseCase", error);
          }
    }
}