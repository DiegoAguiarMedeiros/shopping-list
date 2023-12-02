import SaveAmountController from "./SaveAmountController";
import SaveAmountUseCase from "./SaveAmountUseCase";

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const saveAmountUseCase = new SaveAmountUseCase(storageMMKV)
const saveAmountController = new SaveAmountController(saveAmountUseCase)

export default saveAmountController;