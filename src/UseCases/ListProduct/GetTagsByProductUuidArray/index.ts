import GetTagsByProductUuidArrayController from "./GetTagsByProductUuidArrayController";
import GetTagsByProductUuidArrayUseCase from "./GetTagsByProductUuidArrayUseCase";

import GetListProductsByUuid from "../GetListProductsByUuid";

const getTagsByProductUuidArrayUseCase = new GetTagsByProductUuidArrayUseCase(
  GetListProductsByUuid
);
const getTagsByProductUuidArrayController = new GetTagsByProductUuidArrayController(getTagsByProductUuidArrayUseCase);

export default getTagsByProductUuidArrayController;