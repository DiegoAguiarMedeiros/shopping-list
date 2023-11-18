import SaveListsUseCase from "./SaveListProductsUseCase";
import SaveListsController from "./SaveListProductsController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const saveListsUseCase = new SaveListsUseCase(storageMMKV);
const saveListsController = new SaveListsController(saveListsUseCase);
export default saveListsController;
