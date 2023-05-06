import { itemAmountInterface, itemInterface, listType } from "../types/types"

function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

const getTags = (items: itemInterface[]): string[] => {
    const arr = items.map(item => item.tags)
    return removeDuplicates(arr);
}

const getTotal = (items: itemInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = total + itemList.amount.reduce((accumulator, currentValue) => {
            return accumulator + Number(currentValue.amount);
        }, 0);
    });
    return total
}
const getTotalUn = (items: itemInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = total + itemList.amount.reduce((accumulator, currentValue) => {
            return currentValue.type ? accumulator + currentValue.quantity! : accumulator + 1;
        }, 0);
    });
    return total
}

const removeItemAmount = (items: listType, listUuid: string, itemUuid: string, itemAmountUuid: string): listType => {
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
                    amount: item.amount.filter((amount) => amount.uuid !== itemAmountUuid),
                };
            }),
        };
    });
}
const removeItem = (items: listType, listUuid: string, itemUuid: string): listType => {
    return items.map((list) => {
        if (list.uuid !== listUuid) {
            return list;
        }
        return {
            ...list,
            items: list.items.filter((item) => item.uuid !== itemUuid),
        };
    });
}
const removeList = (items: listType, listUuid: string): listType => {
    return items.filter((list) => list.uuid !== listUuid);
}

export {
    getTags,
    getTotal,
    getTotalUn,
    removeItemAmount,
    removeItem,
    removeList
};