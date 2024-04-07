import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetThemeUseCase {
    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string):string{
        const data = this.MMKVStorage.get(key);
      if (data) {
        return data;
      }
      return "";
    }
}