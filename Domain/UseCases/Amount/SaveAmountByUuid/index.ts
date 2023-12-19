import SaveAmountByUuidController from "./SaveAmountByUuidController";
import SaveAmountByUuidUseCase from "./SaveAmountByUuidUseCase";
import saveAmountController from "../SaveAmount"
import getAmountsController from "../GetAmounts"
import GetAmountByListProductUuid from "../GetAmountByListProductUuid"
import GetListProductByUuid from "../../ListProduct/GetListProductByUuid"
import SaveListProductByUuid from "../../ListProduct/SaveListProductByUuid"

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
const saveAmountByUuidUseCase = new SaveAmountByUuidUseCase(storageMMKV, saveAmountController, getAmountsController, GetAmountByListProductUuid, GetListProductByUuid, SaveListProductByUuid)
const saveAmountByUuidController = new SaveAmountByUuidController(saveAmountByUuidUseCase)

export default saveAmountByUuidController;