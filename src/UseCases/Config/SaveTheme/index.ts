import SaveThemeController from "./SaveThemeController";
import SaveThemeUseCase from "./SaveThemeUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const saveThemeUseCase = new SaveThemeUseCase(storageMMKV);
const saveThemeController = new SaveThemeController(saveThemeUseCase);

export default saveThemeController;