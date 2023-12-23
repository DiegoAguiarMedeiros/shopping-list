import GetListProductsByTagUuidController from "./GetListProductsByTagUuidController";
import GetListProductsByTagUuidUseCase from "./GetListProductsByTagUuidUseCase";

import getProducts from "../GetListProducts";

const getListProductsByTagUuidUseCase = new GetListProductsByTagUuidUseCase(getProducts);
const getListProductsByTagUuidController = new GetListProductsByTagUuidController(getListProductsByTagUuidUseCase);

export default getListProductsByTagUuidController;