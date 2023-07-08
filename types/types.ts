interface ItemAmountInterface {
    uuid: string,
    amount: string,
    type: boolean,
    quantity: string,
}
interface ListItemAmountInterface {
    [key: string]: ItemAmountInterface;
}
interface ItemInterface {
    uuid: string,
    name: string,
    amount: string[],
    active: boolean,
    unit?: string,
    tags: string,
}

interface TagsIterface {
    id: string,
    name: string,
    active: boolean
}

interface ListItemInterface {
    [key: string]: ItemInterface;
}
interface ListInterface {
    uuid: string,
    name: string,
    tags: TagsIterface[],
    items: string[],
}

interface ListType {
    [key: string]: ListInterface;
}

interface BottomSheetProps {
    items?: ListInterface | ItemInterface,
    listId: string,
    buttonText: 'add' | 'edit' | 'copy',
    action: 'addList' | 'editList' | 'addListItem' | 'editListItem' | 'copyList',
    isVisible: boolean;
    onClose: (item: BottomSheetProps) => void;
    children?: React.ReactNode
}

interface TotalType {
    amount: number;
    un: number;
}
export {
    ListType,
    ListItemInterface,
    ListItemAmountInterface,
    ListInterface,
    ItemInterface,
    ItemAmountInterface,
    BottomSheetProps,
    TagsIterface,
    TotalType
};

