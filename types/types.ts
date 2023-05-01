interface itemAmountInterface {
    uuid: string,
    amount: string,
    type: boolean,
}
interface itemInterface {
    uuid: string,
    item: string,
    amount: itemAmountInterface[],
    active: Boolean,
    quantity?: number,
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

