import AsyncStorage from "@react-native-async-storage/async-storage";

import GetListByUuidUseCase from "./GetListByUuidUseCase";
import GetListByUuidController from "./GetListByUuidController";



import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const getListByUuidUseCase = new GetListByUuidUseCase(storageMMKV);

const getListByUuidController = new GetListByUuidController(
  getListByUuidUseCase
);

export default getListByUuidController;
