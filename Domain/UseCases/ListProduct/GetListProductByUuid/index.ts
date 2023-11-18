import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import GetListProductUseCase from "./GetListProductByUuidUseCase";
import GetListProductController from "./GetListProductByUuidController";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";






const getListProductUseCase = new GetListProductUseCase(storageMMKV);

const getListProductController = new GetListProductController(
  getListProductUseCase
);

export default getListProductController;
