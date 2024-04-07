

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";
import SaveListByUuidController from "./SaveListByUuidController";
import saveLists from "../SaveLists";
import getLists from "../GetLists";




const saveListByUuidUseCase = new SaveListByUuidUseCase(
  storageMMKV,
  saveLists,
  getLists
);

const saveListByUuidController = new SaveListByUuidController(
  saveListByUuidUseCase
);

export default saveListByUuidController;
