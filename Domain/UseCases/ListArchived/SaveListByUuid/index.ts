import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";
import SaveListByUuidController from "./SaveListByUuidController";
import saveLists from "../SaveLists";
import getLists from "../GetLists";

const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const saveListByUuidUseCase = new SaveListByUuidUseCase(
  storageMMKV,
  saveLists,
  getLists
);

const saveListByUuidController = new SaveListByUuidController(
  saveListByUuidUseCase
);

export default saveListByUuidController;
