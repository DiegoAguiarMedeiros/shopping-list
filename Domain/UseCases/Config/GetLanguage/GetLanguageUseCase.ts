import { languageType } from "../../../../types/types";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetLanguageUseCase {
    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string):languageType{
        const data = this.MMKVStorage.get(key);
      if (data) {
        return data as languageType;
      }
      return "pt";
    }
}