import GetCurrencyController from "./GetCurrencyController";
import GetCurrencyUseCase from "./GetCurrencyUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getCurrencyUseCase = new GetCurrencyUseCase(storageMMKV);
const getCurrencyController = new GetCurrencyController(getCurrencyUseCase);

export default getCurrencyController;