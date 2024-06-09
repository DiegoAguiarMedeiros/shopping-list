import GetTotalQuantityAmountByListUuidController from "./GetTotalQuantityAmountByListUuidController";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductsByUuid from "../../ListProduct/GetListProductsByUuid";
import GetTotalQuantityAmountByListProductUuid from "../../Amount/GetTotalQuantityAmountByListProductUuid";

import getTagUuidByTagName from "../../Tag/GetTagUuidByTagName";
const getTotalQuantityAmountByListUuidUseCase =
  new GetTotalQuantityAmountByListUuidUseCase(
    GetListByUuid,
    GetListProductsByUuid,
    getTagUuidByTagName,
    GetTotalQuantityAmountByListProductUuid
  );
const getTotalQuantityAmountByListUuidController = new GetTotalQuantityAmountByListUuidController(getTotalQuantityAmountByListUuidUseCase);

export default getTotalQuantityAmountByListUuidController;