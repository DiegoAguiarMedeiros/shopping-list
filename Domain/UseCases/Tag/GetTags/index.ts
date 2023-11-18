

import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetTagsUseCase from "./GetTagsUseCase";
import GetTagsController from "./GetTagsController";




const getTagsUseCase = new GetTagsUseCase(storageMMKV);

const getTagsController = new GetTagsController(getTagsUseCase);

export default getTagsController;
