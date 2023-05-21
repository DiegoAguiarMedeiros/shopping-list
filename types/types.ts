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

interface tagsIterface {
    id: string,
    name: string,
    active: boolean
}
interface listInterface {
    uuid: string,
    name: string,
    tags: tagsIterface[],
    items: itemInterface[],
}
type listType = listInterface[];

interface BottomSheetProps {
    items?: listInterface | itemInterface,
    listId?: string,
    buttonText: 'add' | 'edit' | 'copy',
    action: 'addList' | 'editList' | 'addListItem' | 'editListItem' | 'copyList',
    isVisible: boolean;
    onClose: (item: BottomSheetProps) => void;
    children?: React.ReactNode
}

export {
    listType,
    listInterface,
    itemInterface,
    itemAmountInterface,
    BottomSheetProps,
    tagsIterface
};

