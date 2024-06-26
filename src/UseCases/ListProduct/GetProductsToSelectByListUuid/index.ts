import GetProductsToSelectByListUuidUseCase from "./GetProductsToSelectByListUuidUseCase";
import GetProductsToSelectByListUuidController from "./GetProductsToSelectByListUuidController";

import GetListByUuid from "../../List/GetListByUuid";
import getAllTagsController from "../../Tag/GetTagsObject";
import getAllProductsController from "../GetListProductsTinyByTagUuid";
import { sortArrayOfObjects } from "../../../utils/functions";

import I18n from "i18n-js";
const getProductsToSelectByListUuidUseCase =
  new GetProductsToSelectByListUuidUseCase(
    GetListByUuid,
    getAllTagsController,
    getAllProductsController,
    sortArrayOfObjects,
    I18n
  );
const getProductsToSelectByListUuidController =
  new GetProductsToSelectByListUuidController(
    getProductsToSelectByListUuidUseCase
  );
export default getProductsToSelectByListUuidController;
