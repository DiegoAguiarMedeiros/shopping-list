import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import SaveTagsUseCase from "./SaveTagsUseCase";
import SaveTagsController from "./SaveTagsController";


import storageMMKV from "../../../Service/Implementation/MMKVStorage";





const saveTagsUseCase = new SaveTagsUseCase(storageMMKV);

const saveTagsController = new SaveTagsController(saveTagsUseCase);

export default saveTagsController;
