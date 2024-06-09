import GetTotalQuantityWithoutAmountByListUuidController from "./GetTotalQuantityWithoutAmountByListUuidController";
import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductsByUuid from "../../ListProduct/GetListProductsByUuid";
import GetTotalQuantityWithoutAmountByListProductUuid from "../../Amount/GetTotalQuantityWithoutAmountByListProductUuid"

import getTagUuidByTagName from "../../Tag/GetTagUuidByTagName";

const getTotalQuantityWithoutAmountByListUuidUseCase =
  new GetTotalQuantityWithoutAmountByListUuidUseCase(
    GetListByUuid,
    GetListProductsByUuid,
    getTagUuidByTagName,
    GetTotalQuantityWithoutAmountByListProductUuid
  );
const getTotalQuantityWithoutAmountByListUuidController = new GetTotalQuantityWithoutAmountByListUuidController(getTotalQuantityWithoutAmountByListUuidUseCase);

export default getTotalQuantityWithoutAmountByListUuidController;