import EmptyList from './emptyList'
import ListComponent from './list'
import {  useShoppingListContext } from '../../context/ShoppingList';


export default function Home() {
  
  const { value, setValue } = useShoppingListContext();

  return (
    value ? <ListComponent items={value} /> : <EmptyList />
  );
}

