import {
  IControllerSaveList,
  IControllerGetLists,
} from "../../interface/IController";

export default class SaveListByUuidUseCase {
  constructor(
    private saveLists: IControllerSaveList,
    private getLists: IControllerGetLists
  ) {}

  execute = (listuuid: string): void => {
    try {
      // this.mmkv.set(key, JSON.stringify(data));
      // const listsStringOrNull = this.mmkv.get("SLSHOPPINGLISTARCHIVED");
      // const lists: IListInterface<IList> = listsStringOrNull
      //   ? JSON.parse(listsStringOrNull)
      //   : listsStringOrNull;
      // const newListInterface: IListInterface<IList> = {
      //   ...(lists ? lists : {}),
      //   [data.uuid]: data,
      // };
      const list = this.getLists.handle();
      if (!list.includes(listuuid)) this.saveLists.handle([...list, listuuid]);
    } catch (error) {
      console.error("SaveListByUuidUseCase", error);
    }
  };
}
