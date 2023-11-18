

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import SaveTagByUuidUseCase from "./SaveTagByUuidUseCase";
import SaveTagByUuidController from "./SaveTagByUuidController";
import saveTag from "../SaveTags";
import getTags from "../GetTags";




const saveTagByUuidUseCase = new SaveTagByUuidUseCase(
  storageMMKV,
  saveTag,
  getTags
);

const saveTagByUuidController = new SaveTagByUuidController(
  saveTagByUuidUseCase
);

export default saveTagByUuidController;
