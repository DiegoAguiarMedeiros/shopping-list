import AsyncStorage from "@react-native-async-storage/async-storage";

import GetListByUuidUseCase from "./DeleteListByUuidUseCase";
import GetListByUuidController from "./DeleteListByUuidController";

import { MMKV } from "react-native-mmkv";
import saveLists from "../SaveLists";
import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getListByUuidUseCase = new GetListByUuidUseCase(storageMMKV, saveLists);

const getListByUuidController = new GetListByUuidController(
  getListByUuidUseCase
);

export default getListByUuidController;
