import EmptyList from './emptyList'
import ListComponent from './list'
import { useShoppingListContext } from '../../context/ShoppingList';
import { itemInterface } from '../../types/types';


export default function Home() {

  const { value, setValue } = useShoppingListContext();


  const handleDeleteItemList = (uuid: string): void => {
    console.log('uuid',uuid)
    const newList = value.filter((item) => item.uuid !== uuid)
    setValue(newList);
  }

  return (
    value ? <ListComponent items={value} deleteFromList={handleDeleteItemList} /> : <EmptyList />
  );
}

