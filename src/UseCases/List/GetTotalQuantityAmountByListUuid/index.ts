import GetTotalQuantityAmountByListUuidController from "./GetTotalQuantityAmountByListUuidController";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetAllProductsObjects from "../../ListProduct/GetAllProductsObjects";
import GetTotalQuantityAmountByListProductUuid from "../../Amount/GetTotalQuantityAmountByListProductUuid"

const getTotalQuantityAmountByListUuidUseCase =
  new GetTotalQuantityAmountByListUuidUseCase(
    GetListByUuid,
    GetAllProductsObjects,
    GetTotalQuantityAmountByListProductUuid
  );
const getTotalQuantityAmountByListUuidController = new GetTotalQuantityAmountByListUuidController(getTotalQuantityAmountByListUuidUseCase);

export default getTotalQuantityAmountByListUuidController;