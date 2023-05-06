import EmptyList from './emptyList'
import ListComponent from './list'
import { useShoppingListContext } from '../../context/ShoppingList';
import { itemInterface } from '../../types/types';
import { removeList } from '../../utils/functions';


export default function Home() {

  const { value, setValue } = useShoppingListContext();


  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeList(value, uuid)
    setValue(newList);
  }

  return (
    value ? <ListComponent items={value} deleteFromList={handleDeleteItemList} /> : <EmptyList />
  );
}

