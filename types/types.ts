interface itemInterface {
    uuid: string,
    item: string,
    amount?: number,
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
};

