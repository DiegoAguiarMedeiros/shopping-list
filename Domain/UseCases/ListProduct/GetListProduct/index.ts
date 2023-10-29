import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import GetListProductUseCase from "./GetListProductUseCase";
import GetListProductController from "./GetListProductController";

const storage = new Storage(AsyncStorage);
const getListProductUseCase = new GetListProductUseCase(storage);

const getListProductController = new GetListProductController(
  getListProductUseCase
);

export default getListProductController;
