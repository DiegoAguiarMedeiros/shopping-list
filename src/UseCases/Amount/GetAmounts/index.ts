import GetAmountsController from "./GetAmountsController";
import GetAmountsUseCase from "./GetAmountsUseCase";

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const getAmountsUseCase = new GetAmountsUseCase(storageMMKV)
const getAmountsController = new GetAmountsController(getAmountsUseCase)

export default getAmountsController;