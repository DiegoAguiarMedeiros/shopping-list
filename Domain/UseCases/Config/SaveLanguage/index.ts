import SaveLanguageController from "./SaveLanguageController";
import SaveLanguageUseCase from "./SaveLanguageUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const saveLanguageUseCase = new SaveLanguageUseCase(storageMMKV);
const saveLanguageController = new SaveLanguageController(saveLanguageUseCase);

export default saveLanguageController;