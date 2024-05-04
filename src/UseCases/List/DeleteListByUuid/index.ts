import AsyncStorage from "@react-native-async-storage/async-storage";

import GetListByUuidUseCase from "./DeleteListByUuidUseCase";
import GetListByUuidController from "./DeleteListByUuidController";


import removeListByUuid from "../RemoveListByUuid";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getListByUuidUseCase = new GetListByUuidUseCase(
  storageMMKV,
  removeListByUuid
);

const getListByUuidController = new GetListByUuidController(
  getListByUuidUseCase
);

export default getListByUuidController;
