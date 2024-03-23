import IMMKVStorage from "../../../Service/IMMKVStorage";
import ITag from "../../../Model/ITag";
import {
  IControllerGetTags,
  IControllerSaveTag,
} from "../../interface/IController";

export default class SaveTagByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveTags: IControllerSaveTag,
    private getTags: IControllerGetTags
  ) {}

  execute = (key: string, data: ITag): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const tags = this.getTags.handle();
      this.saveTags.handle([...tags, data.uuid]);
    } catch (error) {
      console.error("SaveTagByUuidUseCase", error);
    }
  };
}
