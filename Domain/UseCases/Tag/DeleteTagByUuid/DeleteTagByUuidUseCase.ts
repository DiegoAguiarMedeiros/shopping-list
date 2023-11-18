import IMMKVStorage from "../../../Service/IMMKVStorage";
import { IListInterface } from "../../../Model/IList";
import { IControllerSaveTag } from "../../interface/IController";
import ITag from "../../../Model/ITag";

export default class DeleteTagUseCase {
  constructor(private mmkv: IMMKVStorage,
    private saveTags: IControllerSaveTag) { }

  execute = (key: string): void => {
    try {
      this.mmkv.delete(key);
      const tagsStringOrNull = this.mmkv.get('SLSHOPPINGTAG');
      if (tagsStringOrNull) {
        const tags: IListInterface<ITag> = tagsStringOrNull ? JSON.parse(tagsStringOrNull) : tagsStringOrNull;
        delete tags[key];
        this.saveTags.handle(tags);
      }
    } catch (error) {
      console.error("DeleteTagUseCase", error);
    }
  };
}
