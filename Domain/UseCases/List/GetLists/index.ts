import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
import GetListsUseCase from "./GetListsUseCase";
import GetListsController from "./GetListsController";

const storage = new MMKV({
  id: `user-storage`,
  path: `/storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getListsUseCase = new GetListsUseCase(storageMMKV);

const getListsController = new GetListsController(getListsUseCase);

export default getListsController;
