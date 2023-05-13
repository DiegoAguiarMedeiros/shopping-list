import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useState } from 'react';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import { useRouter, useSearchParams } from "expo-router";

import { itemInterface, listInterface } from '../../types/types';
import UUIDGenerator from 'react-native-uuid';
import { useShoppingListContext } from '../../context/ShoppingList';



export default function Modal() {
  const { value, setValue } = useShoppingListContext();
  const { listId } = useSearchParams();
  const [newItem, setNewItem] = useState({
    item: '',
    tag: '',
  });
  const router = useRouter();//back
  const colorScheme = useColorScheme();


  const handleSetList = (): void => {
    value ? setValue([returnNewList(), ...value]) : setValue([returnNewList()]);
  }

  const returnNewList = (): listInterface => {
    const item: listInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tags: [],
      items: []
    }
    return item;
  }
  const returnNewItem = (): itemInterface => {
    const item: itemInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      active: false,
      tags: newItem.tag,
      amount: []
    }
    return item;
  }

  const handleSetItemInList = (): void => {

    const newList = value.map((item, index) => {
      item.uuid == listId ? item.items.push(returnNewItem()) : item;
      return item;
    })

    setValue(newList);
    router.push({ pathname: "/iTems", params: { listId: listId } });
  }

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>

      <Styled.InputContainer>
        <InputText placeholder={listId ? 'Nome do item...' : 'Nome da sua lista...'} onChangeText={(item) => {
          setNewItem({
            item: item,
            tag: newItem.tag,
          });
        }} value={newItem.item} />
      </Styled.InputContainer>
      {listId ? <Styled.InputContainer>
        <InputText placeholder='Nome da categoria...' onChangeText={(tag) => {
          setNewItem({
            item: newItem.item,
            tag: tag,
          });
        }} value={newItem.tag} />
      </Styled.InputContainer> : null}


      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button text='Adicionar' background={Colors['light'].buttonBackground} onPress={listId ? handleSetItemInList : handleSetList} />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>

    </Styled.Container>
  );
}

