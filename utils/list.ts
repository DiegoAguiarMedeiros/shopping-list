import Storage from "./storage";
import { listType, listInterface } from '../types/types';


const getList = () => Storage.getShoppingList();

const setList = (list: listType) => {

    Storage.setShoppingList(list);
};
const getListArchived = () => Storage.getShoppingArchivedList();

const setListArchived = (list: listType) => {
    Storage.setShoppingArchivedList(list);
};

export default {
    getList,
    setList,
    getListArchived,
    setListArchived,
};