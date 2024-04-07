

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import SaveListProductByUuidUseCase from "./SaveListProductByUuidUseCase";
import SaveListProductByUuidController from "./SaveListProductByUuidController";
import SaveListProducts from "../SaveListProducts";
import GetListProducts from "../GetAllProducts";




const saveListProductByUuidUseCase = new SaveListProductByUuidUseCase(
  storageMMKV,
  SaveListProducts,
  GetListProducts
);

const saveListProductByUuidController = new SaveListProductByUuidController(
  saveListProductByUuidUseCase
);

export default saveListProductByUuidController;
