import AsyncStorage from "@react-native-async-storage/async-storage";

import DeleteTagByUuidUseCase from "./DeleteTagByUuidUseCase";
import DeleteTagByUuidController from "./DeleteTagByUuidController";


import saveTags from "../SaveTags";
import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const deleteTagByUuidUseCase = new DeleteTagByUuidUseCase(storageMMKV, saveTags);

const deleteTagByUuidController = new DeleteTagByUuidController(
  deleteTagByUuidUseCase
);

export default deleteTagByUuidController;
