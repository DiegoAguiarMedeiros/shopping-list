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

  execute = (data: ITag): void => {
    try {
      this.mmkv.set(data.uuid, JSON.stringify(data));
      const tags = this.getTags.handle();
      if (!tags.includes(data.uuid)) this.saveTags.handle([...tags, data.uuid]);
    } catch (error) {
      console.error("SaveTagByUuidUseCase", error);
    }
  };
}
