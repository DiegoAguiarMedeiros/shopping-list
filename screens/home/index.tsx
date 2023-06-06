import { lazy } from 'react';
import { useShoppingListContext } from '../../context/ShoppingList';
import { KeyboardAvoidingView } from 'react-native'
const EmptyList = lazy(() => import('./emptyList'));
const ListComponent = lazy(() => import('./list'));


export default function Home() {

  const { value } = useShoppingListContext();



  return (
    <KeyboardAvoidingView behavior="padding">
      {value && value.length > 0 ? <ListComponent items={value} /> : <EmptyList />}
    </KeyboardAvoidingView>
  );
}

