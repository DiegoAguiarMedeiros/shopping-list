import GetColorController from "./GetColorController";
import GetColorUseCase from "./GetColorUseCase";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getColorUseCase = new GetColorUseCase(storageMMKV);
const getColorController = new GetColorController(getColorUseCase);

export default getColorController;