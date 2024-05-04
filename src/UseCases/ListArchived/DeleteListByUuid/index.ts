import DeleteListByUuidUseCase from "./DeleteListByUuidUseCase";
import DeleteListByUuidController from "./DeleteListByUuidController";


import RemoveListByUuid from "../RemoveListByUuid";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const deleteListByUuidUseCase = new DeleteListByUuidUseCase(
  storageMMKV,
  RemoveListByUuid
);

const deleteListByUuidController = new DeleteListByUuidController(
  deleteListByUuidUseCase
);

export default deleteListByUuidController;
