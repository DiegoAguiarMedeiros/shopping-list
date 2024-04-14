import GetListProductsByUuidController from "./GetListProductsByUuidController";
import GetListProductsByUuidUseCase from "./GetListProductsByUuidUseCase";

import getProducts from "../GetAllProducts";
import getProductsByUuid from "../GetProductByUuid";

const getListProductsByUuidUseCase = new GetListProductsByUuidUseCase(
  getProducts,
  getProductsByUuid
);
const getListProductsByUuidController = new GetListProductsByUuidController(
  getListProductsByUuidUseCase
);

export default getListProductsByUuidController;
