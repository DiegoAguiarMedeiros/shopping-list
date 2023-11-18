

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetListsUseCase from "./GetListProductsUseCase";
import GetListProductsController from "./GetListProductsController";




const getListsUseCase = new GetListsUseCase(storageMMKV);

const getListProductsController = new GetListProductsController(getListsUseCase);

export default getListProductsController;
