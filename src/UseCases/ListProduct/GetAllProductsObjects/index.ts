import GetAllProductsObjectsUseCase from "./GetAllProductsObjectsUseCase";
import GetAllProductsObjectsController from "./GetAllProductsObjectsController";
import getAllProductsController from "../GetAllProducts";
import getProductController from "../GetProductByUuid";

const getAllProductsObjectsUseCase = new GetAllProductsObjectsUseCase(
  getAllProductsController,
  getProductController
);

const getAllProductsObjectsController = new GetAllProductsObjectsController(
  getAllProductsObjectsUseCase
);

export default getAllProductsObjectsController;
