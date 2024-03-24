import GetTotalQuantityAmountByListUuidController from "./GetTotalQuantityAmountByListUuidController";
import GetTotalQuantityAmountByListUuidUseCase from "./GetTotalQuantityAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductByUuid from "../../ListProduct/GetProductByUuid";
import GetTotalQuantityAmountByListProductUuid from "../../Amount/GetTotalQuantityAmountByListProductUuid"

const getTotalQuantityAmountByListUuidUseCase = new GetTotalQuantityAmountByListUuidUseCase(GetListByUuid, GetListProductByUuid, GetTotalQuantityAmountByListProductUuid);
const getTotalQuantityAmountByListUuidController = new GetTotalQuantityAmountByListUuidController(getTotalQuantityAmountByListUuidUseCase);

export default getTotalQuantityAmountByListUuidController;