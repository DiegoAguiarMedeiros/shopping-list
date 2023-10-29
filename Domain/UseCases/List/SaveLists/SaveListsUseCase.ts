import IStorage from "../../../../Domain/Service/IStorage";
import { IListInterface } from "../../../Model/IList";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export default class SaveListsUseCase {
  constructor(private asyncStorage: IStorage) {}

  execute = (key: string, data: any): void => {
    try {
      this.asyncStorage.save(key, data);
    } catch (error) {
      console.error("_retrieveData", error);
    }
  };
}
