import IMMKVStorage from "../../../Service/IMMKVStorage";
import ITag, { ITagInterface } from "../../../Model/ITag";
import IController from "../../interface/IController";

export default class SaveTagByUuidUseCase {
  constructor(
    private mmkv: IMMKVStorage,
    private saveTags: IController,
    private getTags: IController
  ) { }

  execute = (key: string, data: ITag): void => {
    try {
      this.mmkv.set(key, JSON.stringify(data));
      const TagsStringOrNull = this.mmkv.get('SLSHOPPINGTAG');
      console.log('TagsStringOrNull', TagsStringOrNull)
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
