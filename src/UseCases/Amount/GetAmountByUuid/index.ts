import GetAmountByUuidController from "./GetAmountByUuidController";
import GetAmountByUuidUseCase from "./GetAmountByUuidUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";

const getAmountByUuidUseCase = new GetAmountByUuidUseCase(storageMMKV);
const getAmountByUuidController = new GetAmountByUuidController(
  getAmountByUuidUseCase
);

export default getAmountByUuidController;
