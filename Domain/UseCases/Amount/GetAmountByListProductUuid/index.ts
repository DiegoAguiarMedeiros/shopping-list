import GetAmountByListProductUuidController from "./GetAmountByListProductUuidController";
import GetAmountByListProductUuidUseCase from "./GetAmountByListProductUuidUseCase";
import GetAmounts from "../GetAmounts"

const getAmountByListProductUuidUseCase = new GetAmountByListProductUuidUseCase(GetAmounts);
const getAmountByListProductUuidController = new GetAmountByListProductUuidController(getAmountByListProductUuidUseCase);

export default getAmountByListProductUuidController;