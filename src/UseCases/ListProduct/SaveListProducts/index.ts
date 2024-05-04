import SaveListProductsUseCase from "./SaveListProductsUseCase";
import SaveListProductsController from "./SaveListProductsController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const saveListProductsUseCase = new SaveListProductsUseCase(storageMMKV);
const saveListProductsController = new SaveListProductsController(saveListProductsUseCase);
export default saveListProductsController;
