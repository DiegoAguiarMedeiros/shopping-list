import { languageType } from "../../../../types/types";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class SaveLanguageUseCase{

    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string,language: languageType){
        try {
            this.MMKVStorage.set(key, language);
          } catch (error) {
            console.error("SaveListsUseCase", error);
          }
    }
}