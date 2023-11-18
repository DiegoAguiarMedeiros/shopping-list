import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteProductByUuidUseCase from "./DeleteProductByUuidUseCase";
import DeleteProductByUuidController from "./DeleteProductByUuidController";


import SaveListProducts from "../SaveListProducts";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const deleteProductByUuidUseCase = new DeleteProductByUuidUseCase(storageMMKV, SaveListProducts);

const deleteProductByUuidController = new DeleteProductByUuidController(
  deleteProductByUuidUseCase
);

export default deleteProductByUuidController;
