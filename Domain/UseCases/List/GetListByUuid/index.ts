import AsyncStorage from "@react-native-async-storage/async-storage";

import GetListByUuidUseCase from "./GetListByUuidUseCase";
import GetListByUuidController from "./GetListByUuidController";

import Storage from "../../../Service/Implementation/Storage";

const storage = new Storage(AsyncStorage);
const getListByUuidUseCase = new GetListByUuidUseCase(storage);

const getListByUuidController = new GetListByUuidController(
  getListByUuidUseCase
);

export default getListByUuidController;
