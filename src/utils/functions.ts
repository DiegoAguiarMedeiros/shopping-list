import { IListInterface } from "../Model/IList";
import { IProduct } from "../Model/IProduct";
import ITag from "../Model/ITag";
import {
  ItemAmountInterface,
  ItemInterface,
  ListInterface,
  ListItemInterface,
  ListType,
} from "../types/types";

type ISortArrayOfObjects = <T>(arr: T[], key: keyof T) => T[];

function sortArrayOfObjects<T>(arr: T[], key: keyof T): T[] {
  return arr.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (String(valueA).toUpperCase() < String(valueB).toUpperCase()) {
      return -1;
    }
    if (String(valueA).toUpperCase() > String(valueB).toUpperCase()) {
      return 1;
    }
    return 0;
  });
}

function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

const removeUndefinedFromArray = <T>(arr: T[]): T[] => {
  return arr.filter((item) => item !== null && item !== undefined);
};

const checkTags = (tag: string, tags: ITag[]): boolean => {
  let returnBoolean = false;
  tags.forEach((t) => {
    if (tag === t.name) returnBoolean = true;
  });
  return returnBoolean;
};




function convertToInterface<T extends { uuid: string }>(
  listArray: T[]
): IListInterface<T> {
  const listInterface = {} as IListInterface<T>;
  listArray.forEach((item) => {
    listInterface[item.uuid as string] = item as T;
  });
  return listInterface;
}


export {
  removeUndefinedFromArray,
  checkTags,
  convertToInterface,
  removeDuplicates,
  sortArrayOfObjects,
  ISortArrayOfObjects,
};
