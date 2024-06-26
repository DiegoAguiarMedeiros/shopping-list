import GetTotalAmountByListProductUuidController from "./GetTotalAmountByListProductUuidController";
import GetTotalAmountByListProductUuidUseCase from "./GetTotalAmountByListProductUuidUseCase";
import GetAmountByListProductUuid from "../GetAmountByListProductUuid";
const getTotalAmountByListProductUuidUseCase =
  new GetTotalAmountByListProductUuidUseCase(GetAmountByListProductUuid);
const getTotalAmountByListProductUuidController = new GetTotalAmountByListProductUuidController(getTotalAmountByListProductUuidUseCase);

export default getTotalAmountByListProductUuidController;