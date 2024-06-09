import GetTotalAmountByListUuidController from "./GetTotalAmountByListUuidController";
import GetTotalAmountByListUuidUseCase from "./GetTotalAmountByListUuidUseCase";
import GetListByUuid from "../GetListByUuid"
import GetListProductByUuid from "../../ListProduct/GetListProductsByUuid";
import GetTotalAmountByListProductUuid from "../../Amount/GetTotalAmountByListProductUuid"
import getTagUuidByTagName from "../../Tag/GetTagUuidByTagName";

const getTotalAmountByListUuidUseCase = new GetTotalAmountByListUuidUseCase(
  GetListByUuid,
  GetListProductByUuid,
  getTagUuidByTagName,
  GetTotalAmountByListProductUuid
);
const getTotalAmountByListUuidController = new GetTotalAmountByListUuidController(getTotalAmountByListUuidUseCase);

export default getTotalAmountByListUuidController;