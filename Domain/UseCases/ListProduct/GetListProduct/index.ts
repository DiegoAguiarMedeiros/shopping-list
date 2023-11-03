import AsyncStorage from "@react-native-async-storage/async-storage";

import Storage from "../../../Service/Implementation/Storage";
import GetListProductUseCase from "./GetListProductUseCase";
import GetListProductController from "./GetListProductController";

import { MMKV } from "react-native-mmkv";

import MMKVStorage from "../../../Service/Implementation/MMKVStorage";

const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: "hunter2",
});

const storageMMKV = new MMKVStorage(storage);


const getListProductUseCase = new GetListProductUseCase(storageMMKV);

const getListProductController = new GetListProductController(
  getListProductUseCase
);

export default getListProductController;
