
import { ColorList } from "../../../../constants/Colors";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetColorUseCase {
    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string):ColorList{
        const data = this.MMKVStorage.get(key);
      if (data) {
        return data as ColorList
      }
      return "#43BCAE";
    }
}