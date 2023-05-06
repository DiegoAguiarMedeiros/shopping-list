import AsyncStorage from '@react-native-async-storage/async-storage';
import { listType } from '../types/types';

const _retrieveData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error('_retrieveData', error);
  }
}

const setShoppingList = (value: listType) => {
  AsyncStorage.setItem("SLSHOPPINGLIST", JSON.stringify(value));
};
const getShoppingList = async (): Promise<listType | null> => {
  const listPromise: string | null | undefined = await _retrieveData("SLSHOPPINGLIST");

  if (listPromise) {
    const list: listType = JSON.parse(listPromise);
    return list;
  }

  return null;
};


const setShoppingArchivedList = (value: listType) => {
  AsyncStorage.setItem("SLARCHIVEDSHOPPINGLIST", JSON.stringify(value));
};
const getShoppingArchivedList = async (): Promise<listType | null> => {
  const listPromise: string | null | undefined = await _retrieveData("SLARCHIVEDSHOPPINGLIST");

  if (listPromise) {
    const list: listType = JSON.parse(listPromise);
    return list;
  }

  return null;
};




export default {
  getShoppingList,
  setShoppingList,
  getShoppingArchivedList,
  setShoppingArchivedList,
};
