import SaveAmountByUuidController from "./SaveAmountByUuidController";
import SaveAmountByUuidUseCase from "./SaveAmountByUuidUseCase";
import saveAmountController from "../SaveAmount"
import getAmountsController from "../GetAmounts"

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const saveAmountByUuidUseCase = new SaveAmountByUuidUseCase(storageMMKV, saveAmountController, getAmountsController)
const saveAmountByUuidController = new SaveAmountByUuidController(saveAmountByUuidUseCase)

export default saveAmountByUuidController;