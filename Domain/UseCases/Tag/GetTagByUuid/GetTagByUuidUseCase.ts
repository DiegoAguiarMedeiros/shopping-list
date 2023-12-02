import IMMKVStorage from "../../../Service/IMMKVStorage";
import ITag from "../../../Model/ITag";

export default class GetTagUseCase {
  constructor(private mmkv: IMMKVStorage) { }

  execute = (key: string): ITag => {
    try {
      const data = this.mmkv.get(key);
      if (data) {
        const tag: ITag = JSON.parse(data);
        return tag;
      }
      return {
        uuid: "",
        name: "",
      };
    } catch (error) {
      console.error("GetTagUseCase", error);
      return {
        uuid: "",
        name: "",
      };
    }
  };
}
