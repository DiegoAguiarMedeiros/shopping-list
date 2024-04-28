import GetTagUuidByTagNameController from "./GetTagUuidByTagNameController";
import GetTagUuidByTagNameUseCase from "./GetTagUuidByTagNameUseCase";
import GetTagsObject from "../GetTagsObject";

const getTagUuidByTagNameUseCase = new GetTagUuidByTagNameUseCase(
  GetTagsObject
);
const getTagUuidByTagNameController = new GetTagUuidByTagNameController(getTagUuidByTagNameUseCase);

export default getTagUuidByTagNameController;