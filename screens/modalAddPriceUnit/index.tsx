import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  StyleSheet,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemAmountInterface, itemInterface } from '../../types/types';
import { Link, useRouter, useSearchParams } from 'expo-router';
import InputText from '../../components/InputText';
import Select from '../../components/InputSelect';
import Switch from '../../components/Switch';
import ListPriceGrid from "./listPriceGrid";
import { useNavigation } from '@react-navigation/native';
import { useShoppingListContext } from '../../context/ShoppingList';
import UUIDGenerator from 'react-native-uuid';
import { editItemAmount, removeItemAmount } from '../../utils/functions';


interface AddPriceUnitProps {
  listId: string,
  listItemId: string,
}



export default function AddPriceUnit({ listId, listItemId }: AddPriceUnitProps) {
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState('');
  const colorScheme = useColorScheme();
  const navigation = useNavigation();


  const list = value.filter(({ uuid }) => (uuid === listId))[0]
  const listItem = list.items.filter(({ uuid }) => (uuid === listItemId))[0]

  const returnNewItemAmount = (): itemAmountInterface => {
    const item: itemAmountInterface = {
      uuid: String(UUIDGenerator.v4()),
      amount: newItem,
      type: false,
      quantity: '1'
    }
    return item;
  }

  const handleDeleteAmountInList = (itemUuid: string, itemAmountUuid: string): void => {
    const newList = removeItemAmount(value, list.uuid, itemUuid, itemAmountUuid)
    setValue(newList);
  }
  const handleEditItemsAmount = (id: string, amount: string, type: boolean): void => {
    setValue(editItemAmount(value, list.uuid, listItem.uuid, id, amount, type));
  }
  const handleSetItemInList = (): void => {

    const newList = value.map((item) => {
      item.uuid == listId ? item.items.map((i) => i.uuid === listItem.uuid ? i.amount.push(returnNewItemAmount()) : i) : item;
      return item;
    })
    setValue(newList);
  }

  useEffect(() => {
    navigation.setOptions({
      title: listItem.name
    });
  }, []);
  return (
    <Styled.Container>
      {listItem.amount.length > 0
        ?
        <Styled.WrapperGrid>
          <ScrollView nestedScrollEnabled>
            <Styled.WrapperGridInner>
              <ListPriceGrid item={listItem} removeAmount={handleDeleteAmountInList} editItemsAmount={handleEditItemsAmount} />
            </Styled.WrapperGridInner>
          </ScrollView>
        </Styled.WrapperGrid>
        :
        <></>
      }

      <Styled.WrapperInput>
        <Styled.WrapperInputInner>
          <InputText placeholder='Valor' onChangeText={(item) => { setNewItem(item); }} keyboardType='numeric' value={newItem} />
        </Styled.WrapperInputInner>
        <Styled.WrapperButton>
          <Button icon='send' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={handleSetItemInList} />
        </Styled.WrapperButton>
      </Styled.WrapperInput>
    </Styled.Container >
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // Custom styles for ScrollView
    borderWidth: 1,
    borderStyle: 'solid',
    height: '100%'
    // ...other styles
  },
  scrollView2: {
    // Custom styles for ScrollView
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    height: 100
    // ...other styles
  },
});