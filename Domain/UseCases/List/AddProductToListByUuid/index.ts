import AddProductToListByUuidController from "./AddProductToListByUuidController";
import AddProductToListByUuidUseCase from "./AddProductToListByUuidUseCase";

import GetListByUuid from "../GetListByUuid"
import SaveListByUuid from "../SaveListByUuid"
import GetTagByProductUuid from "../../ListProduct/GetTagByProductUuid"

const addProductToListByUuidUseCase = new AddProductToListByUuidUseCase(GetListByUuid, SaveListByUuid, GetTagByProductUuid);

const addProductToListByUuidController = new AddProductToListByUuidController(
    addProductToListByUuidUseCase
);

export default addProductToListByUuidController;