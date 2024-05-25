import GetListProductsTinyByTagUuidController from "./GetListProductsTinyByTagUuidController";
import GetListProductsTinyByTagUuidUseCase from "./GetListProductsTinyByTagUuidUseCase";

import getProducts from "../GetAllProducts";
import getProductsTinyByUuid from "../GetProductByUuid";

const getListProductsTinyByTagUuidUseCase =
  new GetListProductsTinyByTagUuidUseCase(getProducts, getProductsTinyByUuid);
const getListProductsTinyByTagUuidController =
  new GetListProductsTinyByTagUuidController(
    getListProductsTinyByTagUuidUseCase
  );

export default getListProductsTinyByTagUuidController;
