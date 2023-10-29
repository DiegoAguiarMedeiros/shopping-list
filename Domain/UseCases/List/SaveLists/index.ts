import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import SaveListsUseCase from "./SaveListsUseCase";
import SaveListsController from "./SaveListsController";

const storage = new Storage(AsyncStorage);
const saveListsUseCase = new SaveListsUseCase(storage);

const saveListsController = new SaveListsController(saveListsUseCase);

export default saveListsController;
