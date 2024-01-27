import GetLanguageController from "./GetLanguageController";
import GetLanguageUseCase from "./GetLanguageUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getLanguageUseCase = new GetLanguageUseCase(storageMMKV);
const getLanguageController = new GetLanguageController(getLanguageUseCase);

export default getLanguageController;