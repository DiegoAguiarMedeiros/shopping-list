import DeleteAmountByUuidController from "./DeleteAmountByUuidController";
import DeleteAmountByUuidUseCase from "./DeleteAmountByUuidUseCase";
import GetAmounts from "../GetAmounts";
import SaveAmount from "../SaveAmount";

import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const deleteAmountByUuidUseCase = new DeleteAmountByUuidUseCase(storageMMKV, GetAmounts, SaveAmount);
const deleteAmountByUuidController = new DeleteAmountByUuidController(deleteAmountByUuidUseCase);

export default deleteAmountByUuidController;