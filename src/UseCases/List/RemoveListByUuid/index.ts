import RemoveListByUuidController from "./RemoveListByUuidController";
import RemoveListByUuidUseCase from "./RemoveListByUuidUseCase";

import getListsController from "../GetLists";
import saveListsController from "../SaveLists";

const removeListByUuidUseCase = new RemoveListByUuidUseCase(
  getListsController,
  saveListsController
);
const removeListByUuidController = new RemoveListByUuidController(
  removeListByUuidUseCase
);

export default removeListByUuidController;
