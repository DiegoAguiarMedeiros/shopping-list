import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import SaveListsUseCase from "./SaveListsUseCase";
import SaveListsController from "./SaveListsController";
import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";

const storage = new MMKV({
    id: `user-storage`,
    encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);

const saveListsUseCase = new SaveListsUseCase(storageMMKV);

const saveListsController = new SaveListsController(saveListsUseCase);

export default saveListsController;
