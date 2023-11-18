import AsyncStorage from "@react-native-async-storage/async-storage";

import GetCategoryByUuidUseCase from "./GetTagByUuidUseCase";
import GetCategoryByUuidController from "./GetTagByUuidController";



import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const getCategoryByUuidUseCase = new GetCategoryByUuidUseCase(storageMMKV);

const getCategoryByUuidController = new GetCategoryByUuidController(
  getCategoryByUuidUseCase
);

export default getCategoryByUuidController;
