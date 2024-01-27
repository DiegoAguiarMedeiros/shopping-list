import GetThemeController from "./GetThemeController";
import GetThemeUseCase from "./GetThemeUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getThemeUseCase = new GetThemeUseCase(storageMMKV);
const getThemeController = new GetThemeController(getThemeUseCase);

export default getThemeController;