import GetLastPricesByProductUuidUseCase from "./GetLastPricesByProductUuidUseCase";
import GetLastPricesByProductUuidController from "./GetLastPricesByProductUuidController";
import getListsByProductUuidController from "../GetListsByProductUuid";
import getAmountByListProductUuidController from "../../Amount/GetAmountByListProductUuid";

const getLastPricesByProductUuidUseCase = new GetLastPricesByProductUuidUseCase(getListsByProductUuidController,getAmountByListProductUuidController);
const getLastPricesByProductUuidController = new GetLastPricesByProductUuidController(getLastPricesByProductUuidUseCase);

export default getLastPricesByProductUuidController;