import GetAllProductsObjectsUseCase from "./GetAllProductsObjectsUseCase";
import GetAllProductsObjectsController from "./GetAllProductsObjectsController";
import getAllProductsController from "../GetAllProducts";
import getProductController from "../GetProductByUuid";

import { sortArrayOfObjects } from "../../../utils/functions";

const getAllProductsObjectsUseCase = new GetAllProductsObjectsUseCase(
  getAllProductsController,
  getProductController,
  sortArrayOfObjects
);

const getAllProductsObjectsController = new GetAllProductsObjectsController(
  getAllProductsObjectsUseCase
);

export default getAllProductsObjectsController;
