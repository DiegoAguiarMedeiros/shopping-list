

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetListsUseCase from "./GetListsUseCase";
import GetListsController from "./GetListsController";

const getListsUseCase = new GetListsUseCase(storageMMKV);

const getListsController = new GetListsController(getListsUseCase);

export default getListsController;
