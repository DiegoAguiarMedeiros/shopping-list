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
        const tags: string[] = tagsStringOrNull
          ? JSON.parse(tagsStringOrNull)
          : tagsStringOrNull;

        this.saveTags.handle(tags.filter((tag) => tag !== key));
      }
    } catch (error) {
      console.error("DeleteTagUseCase", error);
    }
  };
}
