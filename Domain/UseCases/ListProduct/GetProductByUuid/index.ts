import GetProductUseCase from "./GetProductByUuidUseCase";
import GetProductController from "./GetProductByUuidController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";

const getProductUseCase = new GetProductUseCase(storageMMKV);

const getProductController = new GetProductController(getProductUseCase);

export default getProductController;
