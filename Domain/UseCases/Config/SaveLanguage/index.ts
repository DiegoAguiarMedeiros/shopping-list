import SaveCurrencyController from "./SaveCurrencyController";
import SaveCurrencyUseCase from "./SaveCurrencyUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const saveCurrencyUseCase = new SaveCurrencyUseCase(storageMMKV);
const saveCurrencyController = new SaveCurrencyController(saveCurrencyUseCase);

export default saveCurrencyController;