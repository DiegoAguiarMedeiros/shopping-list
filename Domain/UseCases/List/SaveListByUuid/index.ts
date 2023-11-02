import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import SaveListByUuidUseCase from "./SaveListByUuidUseCase";
import SaveListByUuidController from "./SaveListByUuidController";
import saveLists from "../SaveLists";
import getLists from "../GetLists";
const storage = new Storage(AsyncStorage);
const saveListByUuidUseCase = new SaveListByUuidUseCase(
  storage,
  saveLists,
  getLists
);

const saveListByUuidController = new SaveListByUuidController(
  saveListByUuidUseCase
);

export default saveListByUuidController;
