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
import { useRouter } from "expo-router";

import { listInterface } from '../../types/types';
import UUIDGenerator from 'react-native-uuid';
import { useShoppingListContext } from '../../context/ShoppingList';



export default function Modal() {
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState('');
  const router = useRouter();//back
  const colorScheme = useColorScheme();



  const handleSetList = () => {
    const item: listInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem,
      items: []
    }
    setValue([item, ...value])
    router.push('/(tabs)');
  }

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.InputContainer>
        <InputText placeholder='Nome da sua lista...' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.InputContainer>

      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button text='Adicionar' background={Colors['light'].buttonBackground} onPress={handleSetList} />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>

    </Styled.Container>
  );
}

