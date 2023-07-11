import {
  ItemAmountInterface,
  ItemInterface,
  ListInterface,
  ListType,
  TagsIterface,
} from "../types/types";

function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}


const removeUndefinedFromArray = <T>(arr: T[]): T[] => {
  return arr.filter((item) => item !== undefined);
};

const getTags = (items: ItemInterface[]): TagsIterface[] => {
  const arr = removeDuplicates(items.map((item) => item.tags));
  let count = 1;
  const tagsArr: TagsIterface[] = arr.map((tag) => {
    return {
      id: String(count++),
      name: tag,
      active: false,
    };
  });
  tagsArr.unshift({
    id: "0",
    name: "Todos",
    active: true,
  });
  return tagsArr.filter(({ name }) => name !== "");
};

const getTotalAmount = (items: ItemAmountInterface[]): number => {
  let total: number = 0;
  items.forEach((itemList) => {
    total = total + Number(itemList.amount) * Number(itemList.quantity);
  });
  return total;
};
const getTotal = (items: ItemInterface[]): number => {
  // let total: number = 0
  // items.forEach(itemList => {
  //     total = total + itemList.amount.reduce((accumulator, currentValue) => {
  //         return accumulator + Number(currentValue.amount) * Number(currentValue.quantity);
  //     }, 0);
  // });
  // return total
  return 1;
};

const getTotalAmountUn = (items: ItemAmountInterface[]): number => {
  // let total: number = 0
  // items.forEach(itemList => {
  //     total = itemList.type ? total + 1 : total + Number(itemList.quantity);
  // });
  // return total
  return 1;
};
const getTotalUn = (items: ItemAmountInterface[]): number => {
  const total: number =
    items.length > 0
      ? items.reduce((accumulator, currentValue) => {
          return currentValue.type
            ? accumulator + 1
            : accumulator + Number(currentValue.quantity);
        }, 0)
      : 1;
  return total;
};
const getTotalWithAmount = (items: ItemAmountInterface[]): number => {
  const total: number =
    items.length > 0
      ? items.reduce((accumulator, currentValue) => {
          return currentValue.type
            ? accumulator + 1
            : accumulator + Number(currentValue.quantity);
        }, 0)
      : 0;
  return total;
};


const editItemAmount = (
  items: ListType,
  listUuid: string,
  itemUuid: string,
  itemAmountUuid: string,
  amountQtd: string,
  amountType: boolean
): ListType => {
  return items.map((list) => {
    if (list.uuid !== listUuid) {
      return list;
    }
    return {
      ...list,
      items: list.items.map((item) => {
        if (item.uuid !== itemUuid) {
          return item;
        }
        return {
          ...item,
          amount: item.amount.map((amount) => {
            if (amount.uuid === itemAmountUuid) {
              return { ...amount, type: amountType, quantity: amountQtd };
            }
            return amount;
          }),
        };
      }),
    };
  });
};
const removeItemAmount = (
  items: ListType,
  listUuid: string,
  itemUuid: string,
  itemAmountUuid: string
): ListType => {
  return items.map((list) => {
    if (list.uuid !== listUuid) {
      return list;
    }
    return {
      ...list,
      items: list.items.map((item) => {
        if (item.uuid !== itemUuid) {
          return item;
        }
        return {
          ...item,
          amount: item.amount.filter(
            (amount) => amount.uuid !== itemAmountUuid
          ),
        };
      }),
    };
  });
};
const removeItem = (
  items: ListType,
  listUuid: string,
  itemUuid: string
): ListType => {
  return items.map((list) => {
    if (list.uuid !== listUuid) {
      return list;
    }
    return {
      ...list,
      items: list.items.filter((item) => item.uuid !== itemUuid),
    };
  });
};
const removeList = (items: ListType, listUuid: string): ListType => {
  return items.filter((list) => list.uuid !== listUuid);
};

export {
  getTags,
  getTotalAmount,
  getTotal,
  getTotalUn,
  getTotalAmountUn,
  getTotalWithAmount,
  removeItemAmount,
  removeItem,
  removeList,
  editItemAmount,
  removeUndefinedFromArray,
};
