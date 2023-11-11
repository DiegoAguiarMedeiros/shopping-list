import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";
import SaveTagByUuidUseCase from "./SaveTagByUuidUseCase";
import SaveTagByUuidController from "./SaveTagByUuidController";
import saveTag from "../SaveTags";
import getTags from "../GetTags";

const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);
const saveTagByUuidUseCase = new SaveTagByUuidUseCase(
  storageMMKV,
  saveTag,
  getTags
);

const saveTagByUuidController = new SaveTagByUuidController(
  saveTagByUuidUseCase
);

export default saveTagByUuidController;
