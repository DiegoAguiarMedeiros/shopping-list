import AsyncStorage from "@react-native-async-storage/async-storage";

import GetTagByUuidUseCase from "./DeleteTagByUuidUseCase";
import GetTagByUuidController from "./DeleteTagByUuidController";

import { MMKV } from "react-native-mmkv";
import saveTags from "../SaveTags";
import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getTagByUuidUseCase = new GetTagByUuidUseCase(storageMMKV, saveTags);

const getTagByUuidController = new GetTagByUuidController(
  getTagByUuidUseCase
);

export default getTagByUuidController;
