import AsyncStorage from "@react-native-async-storage/async-storage";

import GetListByUuidUseCase from "./GetListByUuidUseCase";
import GetListByUuidController from "./GetListByUuidController";

import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getListByUuidUseCase = new GetListByUuidUseCase(storageMMKV);

const getListByUuidController = new GetListByUuidController(
  getListByUuidUseCase
);

export default getListByUuidController;
