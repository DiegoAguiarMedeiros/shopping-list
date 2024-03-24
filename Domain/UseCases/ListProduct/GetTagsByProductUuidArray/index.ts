import GetTagsByProductUuidArrayController from "./GetTagsByProductUuidArrayController";
import GetTagsByProductUuidArrayUseCase from "./GetTagsByProductUuidArrayUseCase";

import getList from "../GetProductByUuid";

const getTagsByProductUuidArrayUseCase = new GetTagsByProductUuidArrayUseCase(getList);
const getTagsByProductUuidArrayController = new GetTagsByProductUuidArrayController(getTagsByProductUuidArrayUseCase);

export default getTagsByProductUuidArrayController;