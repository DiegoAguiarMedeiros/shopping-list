import IMMKVStorage from "../../../Service/IMMKVStorage";
import ITag from "../../../Model/ITag";

export default class GetTagUseCase {
  constructor(private mmkv: IMMKVStorage) { }

  execute = (key: string): ITag | null => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const tag: ITag = JSON.parse(data);
        return tag;
      }
      return null;
    } catch (error) {
      console.error("GetTagUseCase", error);
      return null;
    }
  };
}
