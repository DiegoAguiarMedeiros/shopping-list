import GetNumberOfProductsByTagsUuidUseCase from "./GetNumberOfProductsByTagsUuidUseCase"
import GetNumberOfProductsByTagsUuidController from "./GetNumberOfProductsByTagsUuidController"
import getListProductsController from "../GetListProducts";
import getProductController from "../GetProductByUuid";

const getNumberOfProductsByTagsUuidUseCase =
  new GetNumberOfProductsByTagsUuidUseCase(
    getListProductsController,
    getProductController
  );
const getNumberOfProductsByTagsUuidController = new GetNumberOfProductsByTagsUuidController(getNumberOfProductsByTagsUuidUseCase);

export default getNumberOfProductsByTagsUuidController;