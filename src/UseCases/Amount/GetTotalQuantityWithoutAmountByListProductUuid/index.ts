import GetTotalQuantityWithoutAmountByListProductUuidController from "./GetTotalQuantityWithoutAmountByListProductUuidController";
import GetTotalQuantityWithoutAmountByListProductUuidUseCase from "./GetTotalQuantityWithoutAmountByListProductUuidUseCase";
import GetAmountsObjects from "../GetAmountsObjects";

const getTotalQuantityWithoutAmountByListProductUuidUseCase =
  new GetTotalQuantityWithoutAmountByListProductUuidUseCase(GetAmountsObjects);
const getTotalQuantityWithoutAmountByListProductUuidController = new GetTotalQuantityWithoutAmountByListProductUuidController(getTotalQuantityWithoutAmountByListProductUuidUseCase);

export default getTotalQuantityWithoutAmountByListProductUuidController;