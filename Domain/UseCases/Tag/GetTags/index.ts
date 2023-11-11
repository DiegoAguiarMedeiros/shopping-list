import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
import GetTagsUseCase from "./GetTagsUseCase";
import GetTagsController from "./GetTagsController";

const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const getTagsUseCase = new GetTagsUseCase(storageMMKV);

const getTagsController = new GetTagsController(getTagsUseCase);

export default getTagsController;
