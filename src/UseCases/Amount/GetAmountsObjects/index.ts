import GetAmountsController from "./GetAmountsObjectsController";
import GetAmountsUseCase from "./GetAmountsObjectsUseCase";

import getAmounts from "../GetAmounts";
import getAmountByUuid from "../GetAmountByUuid";

const getAmountsUseCase = new GetAmountsUseCase(getAmounts, getAmountByUuid);
const getAmountsController = new GetAmountsController(getAmountsUseCase);

export default getAmountsController;
