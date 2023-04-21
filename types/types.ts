interface itemInterface {
    uuid: string,
    item: string,
    amount?: number,
    active: Boolean,
    quantity?: number,
    unit?: string,
}

interface listInterface {
    uuid: string,
    name: string,
    items: itemInterface[],
}
type listType = listInterface[];

export {
    listType,
    listInterface,
    itemInterface,
};

