import GetTotalQuantityWithoutAmountByListUuidController from "./GetTotalQuantityWithoutAmountByListUuidController";
import GetTotalQuantityWithoutAmountByListUuidUseCase from "./GetTotalQuantityWithoutAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductsByUuid from "../../ListProduct/GetListProductsByUuid";
import GetTotalQuantityWithoutAmountByListProductUuid from "../../Amount/GetTotalQuantityWithoutAmountByListProductUuid"

const getTotalQuantityWithoutAmountByListUuidUseCase =
  new GetTotalQuantityWithoutAmountByListUuidUseCase(
    GetListByUuid,
    GetListProductsByUuid,
    GetTotalQuantityWithoutAmountByListProductUuid
  );
const getTotalQuantityWithoutAmountByListUuidController = new GetTotalQuantityWithoutAmountByListUuidController(getTotalQuantityWithoutAmountByListUuidUseCase);

export default getTotalQuantityWithoutAmountByListUuidController;