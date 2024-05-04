

import SaveListArchivedByUuidUseCase from "./SaveListArchivedByUuidUseCase";
import SaveListArchivedByUuidController from "./SaveListArchivedByUuidController";
import saveListArchived from "../SaveListArchived";
import getListArchived from "../GetListArchived";

const saveListArchivedByUuidUseCase = new SaveListArchivedByUuidUseCase(
  saveListArchived,
  getListArchived
);

const saveListArchivedByUuidController = new SaveListArchivedByUuidController(
  saveListArchivedByUuidUseCase
);

export default saveListArchivedByUuidController;
