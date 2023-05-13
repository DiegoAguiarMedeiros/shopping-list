interface itemAmountInterface {
    uuid: string,
    amount: string,
    type: boolean,
    quantity?: number,
}
interface itemInterface {
    uuid: string,
    name: string,
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

interface BottomSheetProps {
    items?: listInterface | itemInterface,
    listId?: string,
    action: 'addList' | 'editList' | 'addListItem' | 'editListItem',
    isVisible: boolean;
    onClose: (item: BottomSheetProps) => void;
    children?: React.ReactNode
}

export {
    listType,
    listInterface,
    itemInterface,
    itemAmountInterface,
    BottomSheetProps
};

