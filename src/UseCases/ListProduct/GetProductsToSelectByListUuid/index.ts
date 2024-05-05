import GetProductsToSelectByListUuidUseCase from "./GetProductsToSelectByListUuidUseCase";
import GetProductsToSelectByListUuidController from "./GetProductsToSelectByListUuidController";

import GetListByUuid from "../../List/GetListByUuid";
import getAllProductsController from "../GetAllProducts";
import getProductController from "../GetProductByUuid";
import { sortArrayOfObjects } from "../../../utils/functions";

import I18n from "i18n-js";
const getProductsToSelectByListUuidUseCase =
  new GetProductsToSelectByListUuidUseCase(
    GetListByUuid,
    getAllProductsController,
    getProductController,
    sortArrayOfObjects,
    I18n
  );
const getProductsToSelectByListUuidController =
  new GetProductsToSelectByListUuidController(
    getProductsToSelectByListUuidUseCase
  );
export default getProductsToSelectByListUuidController;
