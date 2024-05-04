import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetTagsUseCase from "./GetTagsObjectUseCase";
import GetTagsController from "./GetTagsObjectController";
import GetTags from "../GetTags";
import GetTagByUuid from "../GetTagByUuid";

const getTagsUseCase = new GetTagsUseCase(GetTags, GetTagByUuid);

const getTagsController = new GetTagsController(getTagsUseCase);

export default getTagsController;
