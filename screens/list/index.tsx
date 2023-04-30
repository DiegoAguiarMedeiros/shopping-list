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
import { itemInterface, listInterface } from '../../types/types';
import { Link, useRouter } from 'expo-router';
import InputText from '../../components/InputText';
import EmptyList from './emptyList';
import ListGrid from './listGrid';
import CircleProgress from '../../components/CircleProgress';
import { useSearchParams } from "expo-router";
import { useShoppingListContext } from '../../context/ShoppingList';
interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../assets/images/empty.png'),
};

const itemsArr: itemInterface[] = []


export default function List() {
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState('');
  const { listId } = useSearchParams();
  const router = useRouter();
  const  list = value.filter(({ uuid }) => (uuid === listId))[0]
  console.log('list', list)
  const colorScheme = useColorScheme();
  const styleDot = {
    backgroundColor: '#000000',
    marginRight: 3,
  };
  const percentage = 66;



  const formatText = (progress: number) => {
    return `${progress}/2`;
  }
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerHeader >
        <Styled.ContainerHeaderInnerText >
          <Styled.ListTitle text={Colors[colorScheme ?? 'light'].text}>
            {list && list.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress >
          <CircleProgress
            filled={list &&  list.items.length}
            progress={list &&  list.items.length}
            total={list &&  list.items.length}
            size={80} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerBody >
        {list && list.items.length ? <ListGrid list={list && list} />:<EmptyList list={list && list.uuid}/>}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

