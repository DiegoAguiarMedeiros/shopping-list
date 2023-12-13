import GetTagsController from "./GetTagsController";
import GetTagsUseCase from "./GetTagsUseCase";

import getList from "../GetListProductByUuid";

const getTagsUseCase = new GetTagsUseCase(getList);
const getTagsController = new GetTagsController(getTagsUseCase);

export default getTagsController;