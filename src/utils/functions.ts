import { IListInterface } from "../Domain/Model/IList";
import { IProduct } from "../Domain/Model/IProduct";
import ITag from "../Domain/Model/ITag";
import {
  ItemAmountInterface,
  ItemInterface,
  ListInterface,
  ListItemInterface,
  ListType,
} from "../types/types";


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

const getTags = (items: IProduct[]): ITag[] => {
  const arr = removeDuplicates(items.map((item) => item.tag));
  let count = 1;
  const tagsArr: ITag[] = arr.map((tag) => {
    return {
      uuid: String(count++),
      name: tag,
    };
  });
  tagsArr.unshift({
    uuid: "0",
    name: "Todos",
  });
  return tagsArr.filter(({ name }) => name !== "");
};

const getTagsFromListItemInterface = (obj: ListItemInterface): ITag[] => {
  const tagsArr: ITag[] = [];
  const tagsArrString: string[] = [];
  let count = 1;
  for (const key in obj) {
    if (!tagsArrString.includes(obj[key].tags)) {
      tagsArrString.push(obj[key].tags);
      tagsArr.push({
        uuid: String(count++),
        name: obj[key].tags,
      });
    }
  }
  if (tagsArr.length >= 1) {
    tagsArr.unshift({
      uuid: "0",
      name: "Todos",
    });
  }
  return tagsArr;
};

const getTotalAmount = (items: ItemAmountInterface[]): number => {
  let total: number = 0;
  items.forEach((itemList) => {
    total = total + Number(itemList?.amount) * Number(itemList?.quantity);
  });
  return total;
};

const getTotalAmountUn = (items: ItemAmountInterface[]): number => {
  let total: number = 0;
  items.forEach((itemList) => {
    total = itemList?.type ? total + 1 : total + Number(itemList?.quantity);
  });
  return total;
};

const getTotalWithAmount = (items: ItemAmountInterface[]): number => {
  const total: number =
    items.length > 0
      ? items.reduce((accumulator, currentValue) => {
        return currentValue.type
          ? accumulator + 1
          : accumulator + Number(currentValue?.quantity);
      }, 0)
      : 0;
  return total;
};

function convertToInterface<T extends { uuid: string }>(listArray: T[]): IListInterface<T> {
  const listInterface = {} as IListInterface<T>;
  listArray.forEach((item) => {
    listInterface[item.uuid as string] = item as T;
  });
  return listInterface;
}

// const editItemAmount = (
//   items: ListType,
//   listUuid: string,
//   itemUuid: string,
//   itemAmountUuid: string,
//   amountQtd: string,
//   amountType: boolean
// ): ListType => {
//   return items.map((list) => {
//     if (list.uuid !== listUuid) {
//       return list;
//     }
//     return {
//       ...list,
//       items: list.items.map((item) => {
//         if (item.uuid !== itemUuid) {
//           return item;
//         }
//         return {
//           ...item,
//           amount: item.amount.map((amount) => {
//             if (amount.uuid === itemAmountUuid) {
//               return { ...amount, type: amountType, quantity: amountQtd };
//             }
//             return amount;
//           }),
//         };
//       }),
//     };
//   });
// };
// const removeItemAmount = (
//   items: ListType,
//   listUuid: string,
//   itemUuid: string,
//   itemAmountUuid: string
// ): ListType => {
//   return items.map((list) => {
//     if (list.uuid !== listUuid) {
//       return list;
//     }
//     return {
//       ...list,
//       items: list.items.map((item) => {
//         if (item.uuid !== itemUuid) {
//           return item;
//         }
//         return {
//           ...item,
//           amount: item.amount.filter(
//             (amount) => amount.uuid !== itemAmountUuid
//           ),
//         };
//       }),
//     };
//   });
// };

export {
  getTags,
  getTotalAmount,
  getTotalAmountUn,
  getTotalWithAmount,
  removeUndefinedFromArray,
  getTagsFromListItemInterface,
  checkTags,
  convertToInterface,
  removeDuplicates,
  sortArrayOfObjects
};
