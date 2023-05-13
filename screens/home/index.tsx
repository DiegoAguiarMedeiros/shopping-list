import EmptyList from './emptyList'
import ListComponent from './list'
import { useShoppingListContext } from '../../context/ShoppingList';
import { itemInterface } from '../../types/types';
import { removeList } from '../../utils/functions';
import { KeyboardAvoidingView } from 'react-native'


export default function Home() {

  const { value, setValue } = useShoppingListContext();


  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeList(value, uuid)
    setValue(newList);
  }
  console.log('value', value)
  return (
    <KeyboardAvoidingView behavior="padding">
      {value && value.length > 0 ? <ListComponent items={value} deleteFromList={handleDeleteItemList} /> : <EmptyList />}
    </KeyboardAvoidingView>
  );
}

