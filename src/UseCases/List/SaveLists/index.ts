import SaveListsUseCase from "./SaveListsUseCase";
import SaveListsController from "./SaveListsController";

import storageMMKV from "../../../Service/Implementation/MMKVStorage";

const saveListsUseCase = new SaveListsUseCase(storageMMKV);

const saveListsController = new SaveListsController(saveListsUseCase);

export default saveListsController;
