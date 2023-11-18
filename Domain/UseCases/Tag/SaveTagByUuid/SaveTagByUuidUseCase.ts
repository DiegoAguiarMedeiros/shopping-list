import IMMKVStorage from "../../../Service/IMMKVStorage";
import ITag, { ITagInterface } from "../../../Model/ITag";
import { IControllerSaveTag } from "../../interface/IController";

export default class SaveTagByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveTags: IControllerSaveTag,
    private getTags: IControllerSaveTag
  ) { }

  execute = (key: string, data: ITag): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const TagsStringOrNull = this.mmkv.get('SLSHOPPINGTAG');
      const Tags: ITagInterface = TagsStringOrNull ? JSON.parse(TagsStringOrNull) : TagsStringOrNull;
      const newTagInterface: ITagInterface = {
        ...(Tags ? Tags : {}),
        [data.uuid]: data,
      };
      this.saveTags.handle(newTagInterface);
    } catch (error) {
      console.error("SaveTagByUuidUseCase", error);
    }
  };
}
