import GetTagByProductUuidControler from "./GetTagByProductUuidController";
import GetTagByProductUuidUseCase from "./GetTagByProductUuidUseCase";

import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getTagByProductUuidUseCase = new GetTagByProductUuidUseCase(storageMMKV);

const getTagByProductUuidControler = new GetTagByProductUuidControler(
    getTagByProductUuidUseCase
);

export default getTagByProductUuidControler;