import DeleteListByUuidUseCase from "./DeleteListByUuidUseCase";
import DeleteListByUuidController from "./DeleteListByUuidController";


import saveLists from "../SaveListArchived";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const deleteListByUuidUseCase = new DeleteListByUuidUseCase(storageMMKV, saveLists);

const deleteListByUuidController = new DeleteListByUuidController(
  deleteListByUuidUseCase
);

export default deleteListByUuidController;
