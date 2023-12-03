import GetTagUuidByTagNameController from "./GetTagUuidByTagNameController";
import GetTagUuidByTagNameUseCase from "./GetTagUuidByTagNameUseCase";
import GetTags from "../GetTags"

const getTagUuidByTagNameUseCase = new GetTagUuidByTagNameUseCase(GetTags);
const getTagUuidByTagNameController = new GetTagUuidByTagNameController(getTagUuidByTagNameUseCase);

export default getTagUuidByTagNameController;