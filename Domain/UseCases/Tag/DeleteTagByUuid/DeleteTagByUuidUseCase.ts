import IMMKVStorage from "../../../Service/IMMKVStorage";
import { ITagInterface } from "../../../Model/ITag";
import IController from "../../interface/IController";

export default class DeleteTagUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveTags: IController) { }

  execute = (key: string): void => {
    try {
      console.log('key', key)
      this.mmkv.delete(key);
      const tagsStringOrNull = this.mmkv.get('SLSHOPPINGTAG');
      console.log('tagsStringOrNull', tagsStringOrNull)
      if (tagsStringOrNull) {
        const tags: ITagInterface = tagsStringOrNull ? JSON.parse(tagsStringOrNull) : tagsStringOrNull;
        delete tags[key];
        this.saveTags.handle(tags);
      }
    } catch (error) {
      console.error("DeleteTagUseCase", error);
    }
  };
}
