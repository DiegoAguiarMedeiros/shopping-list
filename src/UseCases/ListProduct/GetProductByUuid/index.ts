import GetProductByUuidUseCase from "./GetProductByUuidUseCase";
import GetProductByUuidController from "./GetProductByUuidController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";

const getProductByUuidUseCase = new GetProductByUuidUseCase(storageMMKV);

const getProductByUuidController = new GetProductByUuidController(
  getProductByUuidUseCase
);

export default getProductByUuidController;
