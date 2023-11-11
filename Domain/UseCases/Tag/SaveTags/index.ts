import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import SaveTagsUseCase from "./SaveTagsUseCase";
import SaveTagsController from "./SaveTagsController";
import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";

const storage = new MMKV({
    id: `user-storage`,
    encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);

const saveTagsUseCase = new SaveTagsUseCase(storageMMKV);

const saveTagsController = new SaveTagsController(saveTagsUseCase);

export default saveTagsController;
