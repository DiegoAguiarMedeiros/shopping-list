import GetListProductsByTagUuidController from "./GetListProductsByTagUuidController";
import GetListProductsByTagUuidUseCase from "./GetListProductsByTagUuidUseCase";

import getProducts from "../GetAllProducts";
import getProductsByUuid from "../GetProductByUuid";

const getListProductsByTagUuidUseCase = new GetListProductsByTagUuidUseCase(
  getProducts,
  getProductsByUuid
);
const getListProductsByTagUuidController = new GetListProductsByTagUuidController(getListProductsByTagUuidUseCase);

export default getListProductsByTagUuidController;