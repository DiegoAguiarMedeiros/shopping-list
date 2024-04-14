import GetListsByProductUuidUseCase from "./GetListsByProductUuidUseCase";
import GetListsByProductUuidController from "./GetListsByProductUuidController";
import getLists from "../GetListArchived";

const getListsByProductUuidUseCase = new GetListsByProductUuidUseCase(getLists);
const getListsByProductUuidController = new GetListsByProductUuidController(getListsByProductUuidUseCase);

export default getListsByProductUuidController;