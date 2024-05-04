import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetAllProductsUseCase from "./GetAllProductsUseCase";
import GetAllProductsController from "./GetAllProductsController";

const getAllProductsUseCase = new GetAllProductsUseCase(storageMMKV);

const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase
);

export default getAllProductsController;
