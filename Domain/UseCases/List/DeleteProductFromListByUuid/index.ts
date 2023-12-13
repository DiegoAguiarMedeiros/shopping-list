import DeleteProductFromListByUuidController from "./DeleteProductFromListByUuidController";
import DeleteProductFromListByUuidUseCase from "./DeleteProductFromListByUuidUseCase";


import GetListByUuid from "../GetListByUuid"
import DeleteAmountByUuid from "../../Amount/DeleteAmountByUuid";
import GetAmountByListProductUuid from "../../Amount/GetAmountByListProductUuid"
import SaveListByUuid from "../SaveListByUuid"
import GetTagByProductUuid from "../../ListProduct/GetTags"

const deleteProductFromListByUuidUseCase = new DeleteProductFromListByUuidUseCase(DeleteAmountByUuid, GetAmountByListProductUuid, SaveListByUuid, GetTagByProductUuid, GetListByUuid)
const deleteProductFromListByUuidController = new DeleteProductFromListByUuidController(deleteProductFromListByUuidUseCase)

export default deleteProductFromListByUuidController;