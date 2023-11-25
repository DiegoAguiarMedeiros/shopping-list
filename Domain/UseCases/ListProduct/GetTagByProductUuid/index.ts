import GetTagByProductUuidControler from "./GetTagByProductUuidController";
import GetTagByProductUuidUseCase from "./GetTagByProductUuidUseCase";

GetTagByProductUuidUseCase
GetTagByProductUuidControler

import storageMMKV from "../../../Service/Implementation/MMKVStorage";


const getTagByProductUuidUseCase = new GetTagByProductUuidUseCase(storageMMKV);

const getTagByProductUuidControler = new GetTagByProductUuidControler(
    getTagByProductUuidUseCase
);

export default getTagByProductUuidControler;