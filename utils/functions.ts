import { itemAmountInterface, itemInterface, listType, tagsIterface } from "../types/types"

function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

const getTags = (items: itemInterface[]): tagsIterface[] => {
    const arr = removeDuplicates(items.map(item => item.tags))
    let count = 1;
    const tagsArr: tagsIterface[] = arr.map(tag => {
        return {
            id: String(count++),
            name: tag,
            active: false
        }
    })
    tagsArr.unshift({
        id: '0',
        name: 'Todos',
        active: true
    })
    return tagsArr.filter(({name}) => name !== '');
}

const getTotalAmount = (items: itemAmountInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = total + (Number(itemList.amount) * Number(itemList.quantity));
    });
    return total
}
const getTotal = (items: itemInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = total + itemList.amount.reduce((accumulator, currentValue) => {
            return accumulator + Number(currentValue.amount) * Number(currentValue.quantity);
        }, 0);
    });
    return total
}

const getTotalAmountUn = (items: itemAmountInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = itemList.type ? total + 1 : total + Number(itemList.quantity);
    });
    return total
}
const getTotalUn = (items: itemInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = itemList.amount.length > 0 ? total + itemList.amount.reduce((accumulator, currentValue) => {
            return currentValue.type ? accumulator + 1 : accumulator + Number(currentValue.quantity);
        }, 0) : total + 1;
    });
    return total
}
const getTotalWithAmount = (items: itemInterface[]): number => {
    let total: number = 0
    items.forEach(itemList => {
        total = itemList.amount.length > 0 ? total + itemList.amount.reduce((accumulator, currentValue) => {
            return currentValue.type ? accumulator + 1 : accumulator + Number(currentValue.quantity);
        }, 0) : total;
    });
    return total
}

const editItemAmount = (items: listType, listUuid: string, itemUuid: string, itemAmountUuid: string, amountQtd: string, amountType: boolean): listType => {
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
                            return { ...amount, type: amountType, quantity: amountQtd }
                        }
                        return amount;
                    }),
                };
            }),
        };
    });
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
    getTotalAmount,
    getTotal,
    getTotalUn,
    getTotalAmountUn,
    getTotalWithAmount,
    removeItemAmount,
    removeItem,
    removeList,
    editItemAmount
};