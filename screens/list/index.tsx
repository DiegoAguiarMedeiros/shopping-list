import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Link, useRouter } from 'expo-router';
import InputText from '../../components/InputText';
import EmptyList from './emptyList';
import ListGrid from './listGrid';
import CircleProgress from '../../components/CircleProgress';
import { useSearchParams } from "expo-router";
import { useShoppingListContext } from '../../context/ShoppingList';
import { itemInterface } from '../../types/types';
interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../assets/images/empty.png'),
};



export default function List() {
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState('');
  const { listId } = useSearchParams();
  const router = useRouter();
  const list = value.filter(({ uuid }) => (uuid === listId))[0]
  const colorScheme = useColorScheme();
  const styleDot = {
    backgroundColor: '#000000',
    marginRight: 3,
  };
  const percentage = 66;

  const returnNewItemAfterDelete = (uuid: string): itemInterface[] => {
    const newItem: itemInterface[] = list.items.filter((item) => item.uuid !== uuid)
    return newItem;
  }

  const handleDeleteItemList = (uuid: string): void => {
    const newList = value.map((item) => {
      item.items = returnNewItemAfterDelete(uuid);
      return item;
    })
    setValue(newList);
  }

  const formatText = (progress: number) => {
    return `${progress}/2`;
  }
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerHeader >
        <Styled.ContainerHeaderInnerText >
          <Styled.ListTitle text={Colors[colorScheme ?? 'light'].text}>
            {list.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress >
          <CircleProgress
            filled={list.items.length}
            progress={list.items.length}
            total={list.items.length}
            size={80} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerBody >
        {list.items.length ? <ListGrid list={list} deleteItemList={handleDeleteItemList} /> : <EmptyList list={list.uuid} />}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

