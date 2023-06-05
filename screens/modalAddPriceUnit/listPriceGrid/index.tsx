import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch,
  StyleSheet
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import ListPriceItem from './listPriceItem'
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { itemInterface, itemAmountInterface } from '../../../types/types';
import { Link, useRouter, useSearchParams } from 'expo-router';
import InputText from '../../../components/InputText';
import Select from '../../../components/InputSelect';
import Switch from '../../../components/Switch';
import { useNavigation } from '@react-navigation/native';
import { useShoppingListContext } from '../../../context/ShoppingList';
interface listProps {
  item: itemInterface,
  removeAmount: (itemUuid: string, itemAmountUuid: string) => void;
  editItemsAmount: (id: string, amount: string, type: boolean) => void;
}

export default function ListPriceGrid({ item, editItemsAmount, removeAmount }: listProps) {
  const colorScheme = useColorScheme();
  const handleRemoveAmount = (itemAmountUuid: string): void => {
    removeAmount(item.uuid, itemAmountUuid);
  }

  return (
    <Styled.Container>
          <Styled.ContainerListPriceItem>
            {item.amount.map((itemAmount: itemAmountInterface) =>
              <ListPriceItem removeAmount={handleRemoveAmount} itemAmount={itemAmount} key={itemAmount.uuid} editItemsAmount={editItemsAmount} />
            )}
          </Styled.ContainerListPriceItem>
    </Styled.Container>
  );
}

