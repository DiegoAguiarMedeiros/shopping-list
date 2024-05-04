import GetTotalAmountByListUuidController from "./GetTotalAmountByListUuidController";
import GetTotalAmountByListUuidUseCase from "./GetTotalAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductByUuid from "../../ListProduct/GetListProductsByUuid";
import GetTotalAmountByListProductUuid from "../../Amount/GetTotalAmountByListProductUuid"

const getTotalAmountByListUuidUseCase = new GetTotalAmountByListUuidUseCase(GetListByUuid, GetListProductByUuid, GetTotalAmountByListProductUuid);
const getTotalAmountByListUuidController = new GetTotalAmountByListUuidController(getTotalAmountByListUuidUseCase);

export default getTotalAmountByListUuidController;