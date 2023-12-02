import AsyncStorage from "@react-native-async-storage/async-storage";

import GetTagByUuidUseCase from "./GetTagByUuidUseCase";
import GetTagByUuidController from "./GetTagByUuidController";



import storageMMKV from "../../../Service/Implementation/MMKVStorage";



const getTagByUuidUseCase = new GetTagByUuidUseCase(storageMMKV);

const getTagByUuidController = new GetTagByUuidController(
  getTagByUuidUseCase
);

export default getTagByUuidController;
