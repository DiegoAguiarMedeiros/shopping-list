import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteTagByUuidUseCase from "./DeleteTagByUuidUseCase";
import DeleteTagByUuidController from "./DeleteTagByUuidController";

import { MMKV } from "react-native-mmkv";
import saveTags from "../SaveTags";
import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const deleteTagByUuidUseCase = new DeleteTagByUuidUseCase(storageMMKV, saveTags);

const deleteTagByUuidController = new DeleteTagByUuidController(
  deleteTagByUuidUseCase
);

export default deleteTagByUuidController;
