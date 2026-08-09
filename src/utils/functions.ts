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

const formatInput = (value: string): string => {
    let newValue = value.replace(".", "");
    let newValueNUmber = Number(newValue);
    newValue = String(newValueNUmber);
    if (newValue.length == 1) {
      newValue = "0.00" + newValue;
    } else if (newValue.length == 2) {
      newValue = "0.0" + newValue;
    } else if (newValue.length == 3) {
      newValue = "0." + newValue;
    } else if (newValue.length >= 4) {
      newValue = (Number(newValue) / 1000).toFixed(3);
    }
    return newValue;
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

function formatValue(value: string): string | number {
  const number = parseFloat(value);

  // If there's no dot, it's an integer -> return the number itself
  if (!value.includes(".")) {
    return number;
  }

  // It's a decimal
  if (number >= 1) {
    return `${number.toFixed(2)} Kg`;
  } else {
    return `${number * 1000} g`;
  }
}

export {
  removeUndefinedFromArray,
  checkTags,
  convertToInterface,
  removeDuplicates,
  sortArrayOfObjects,
  ISortArrayOfObjects,
  formatInput,
  formatValue
};
