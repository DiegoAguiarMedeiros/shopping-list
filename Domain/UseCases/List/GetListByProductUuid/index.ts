import GetListByProductUuidUseCase from "./GetListByProductUuidUseCase";
import GetListByProductUuidController from "./GetListByProductUuidController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import getListsController from "../GetLists"

const getListByProductUuidUseCase = new GetListByProductUuidUseCase(storageMMKV,getListsController);
const getListByProductUuidController = new GetListByProductUuidController(getListByProductUuidUseCase);

export default getListByProductUuidController;