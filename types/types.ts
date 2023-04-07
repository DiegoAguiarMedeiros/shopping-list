interface itemInterface {
    id: number,
    item: string,
    amount?: number,
    active: Boolean,
    quantity?: number,
    unit?: string,
}

interface listInterface {
    name: number,
    items: listInterface[],
}
type listType = listInterface[];

export {
    listType,
    listInterface,
    itemInterface,
};

