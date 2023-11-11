import IMMKVStorage from "../../../Service/IMMKVStorage";
import { ITagInterface } from "../../../Model/ITag";

export default class GetTagUseCase {
  constructor(private mmkv: IMMKVStorage) { }

  execute = (key: string): ITagInterface | null => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const tag: ITagInterface = JSON.parse(data);
        return tag;
      }
      return null;
    } catch (error) {
      console.error("GetTagUseCase", error);
      return null;
    }
  };
}
