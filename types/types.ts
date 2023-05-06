interface itemAmountInterface {
    uuid: string,
    amount: string,
    type: boolean,
    quantity?: number,
}
interface itemInterface {
    uuid: string,
    item: string,
    amount: itemAmountInterface[],
    active: Boolean,
    unit?: string,
    tags: string,
}

interface listInterface {
    uuid: string,
    name: string,
    tags: string[],
    items: itemInterface[],
}
type listType = listInterface[];

export {
    listType,
    listInterface,
    itemInterface,
    itemAmountInterface
};

