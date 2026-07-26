
import { ColorList, DEFAULT_ACCENT_COLOR } from "../../../../constants/Colors";
import IMMKVStorage from "../../../Service/IMMKVStorage";

export default class GetColorUseCase {
    constructor(private MMKVStorage: IMMKVStorage) { }
    execute(key: string):ColorList{
        const data = this.MMKVStorage.get(key);
      if (data) {
        return data as ColorList
      }
      return DEFAULT_ACCENT_COLOR;
    }
}
