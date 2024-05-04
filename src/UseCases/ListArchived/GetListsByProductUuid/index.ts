import GetListsByProductUuidUseCase from "./GetListsByProductUuidUseCase";
import GetListsByProductUuidController from "./GetListsByProductUuidController";
import GetListArchived from "../GetListArchived";
import GetListByUuid from "../../List/GetListByUuid";

const getListsByProductUuidUseCase = new GetListsByProductUuidUseCase(
  GetListArchived,
  GetListByUuid
);
const getListsByProductUuidController = new GetListsByProductUuidController(getListsByProductUuidUseCase);

export default getListsByProductUuidController;