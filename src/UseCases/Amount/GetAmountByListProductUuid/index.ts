import GetAmountByListProductUuidController from "./GetAmountByListProductUuidController";
import GetAmountByListProductUuidUseCase from "./GetAmountByListProductUuidUseCase";
import GetAmountsObjects from "../GetAmountsObjects";

const getAmountByListProductUuidUseCase = new GetAmountByListProductUuidUseCase(
  GetAmountsObjects
);
const getAmountByListProductUuidController = new GetAmountByListProductUuidController(getAmountByListProductUuidUseCase);

export default getAmountByListProductUuidController;