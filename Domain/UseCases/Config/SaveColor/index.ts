import SaveColorController from "./SaveColorController";
import SaveColorUseCase from "./SaveColorUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const saveColorUseCase = new SaveColorUseCase(storageMMKV);
const saveColorController = new SaveColorController(saveColorUseCase);

export default saveColorController;