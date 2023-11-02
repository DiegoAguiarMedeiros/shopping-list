import IStorage from "../../../Service/IStorage";
import { IListInterface } from "../../../Model/IList";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import IController from "../../interface/IController";

export default class SaveListByUuidUseCase {
  constructor(
    private asyncStorage: IStorage,
    private saveLists: IController,
    private getLists: IController
  ) {}

  execute = (key: string, data: any): void => {
    try {
      this.asyncStorage.save(key, data);
    } catch (error) {
      console.error("_retrieveData", error);
    }
  };
}
