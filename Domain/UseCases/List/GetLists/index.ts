import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import GetListsUseCase from "./GetListsUseCase";
import GetListsController from "./GetListsController";

const storage = new Storage(AsyncStorage);
const getListsUseCase = new GetListsUseCase(storage);

const getListsController = new GetListsController(getListsUseCase);

export default getListsController;
