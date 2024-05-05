import storageMMKV from "../../../Service/Implementation/MMKVStorage";
import GetTagsObjectUseCase from "./GetTagsObjectUseCase";
import GetTagsObjectController from "./GetTagsObjectController";
import GetTags from "../GetTags";
import GetTagByUuid from "../GetTagByUuid";
import { sortArrayOfObjects } from "../../../utils/functions";

const getTagsObjectUseCase = new GetTagsObjectUseCase(
  GetTags,
  GetTagByUuid,
  sortArrayOfObjects
);

const getTagsObjectController = new GetTagsObjectController(
  getTagsObjectUseCase
);

export default getTagsObjectController;
