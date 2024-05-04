import RemoveListByUuidController from "./RemoveListByUuidController";
import RemoveListByUuidUseCase from "./RemoveListByUuidUseCase";

import GetListArchived from "../GetListArchived";
import SaveListArchived from "../SaveListArchived";

const removeListByUuidUseCase = new RemoveListByUuidUseCase(
  GetListArchived,
  SaveListArchived
);
const removeListByUuidController = new RemoveListByUuidController(
  removeListByUuidUseCase
);

export default removeListByUuidController;
