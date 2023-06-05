import { lazy } from 'react';
import { useShoppingListContext } from '../../context/ShoppingList';
import { removeList } from '../../utils/functions';
import { KeyboardAvoidingView } from 'react-native'
const EmptyList = lazy(() => import('./emptyList'));
const ListComponent = lazy(() => import('./list'));


export default function Home() {

  const { value, setValue } = useShoppingListContext();


  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeList(value, uuid)
    setValue(newList);
  }
  return (
    <KeyboardAvoidingView behavior="padding">
      {value && value.length > 0 ? <ListComponent items={value} deleteFromList={handleDeleteItemList} /> : <EmptyList />}
    </KeyboardAvoidingView>
  );
}

