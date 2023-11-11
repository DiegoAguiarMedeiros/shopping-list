import AsyncStorage from "@react-native-async-storage/async-storage";

import GetCategoryByUuidUseCase from "./GetTagByUuidUseCase";
import GetCategoryByUuidController from "./GetTagByUuidController";

import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getCategoryByUuidUseCase = new GetCategoryByUuidUseCase(storageMMKV);

const getCategoryByUuidController = new GetCategoryByUuidController(
  getCategoryByUuidUseCase
);

export default getCategoryByUuidController;
