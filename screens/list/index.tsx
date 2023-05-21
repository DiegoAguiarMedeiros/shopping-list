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
import { itemInterface, tagsIterface } from '../../types/types';
import { getTags, getTotalUn, getTotalWithAmount, removeItem } from '../../utils/functions';
import FilterButtons from '../../components/FilterButtons';
interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../assets/images/empty.png'),
};



export default function List() {
  const { value, setValue } = useShoppingListContext();
  const router = useRouter();
  const { listId } = useSearchParams();
  const list = value.filter(({ uuid }) => (uuid === listId))[0]
  const [filteredList, setFilteredList] = useState<itemInterface[]>()
  const [filter, setFilter] = useState('Todos');

  const colorScheme = useColorScheme();
  const styleDot = {
    backgroundColor: '#000000',
    marginRight: 3,
  };
  const percentage = 66;
  const totalWithAmount = list.items ? getTotalWithAmount(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;
  const totalUn = list.items ? getTotalUn(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;

  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeItem(value, list.uuid, uuid)
    setValue(newList);
  }

  useEffect(() => {
    const newFilteredList = list.items.filter((item: itemInterface) => item.tags === filter)
    setFilteredList(newFilteredList!)
  }, [filter])

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerHeader >
        <Styled.ContainerHeaderInnerText>
          <Styled.ListTitle text={Colors[colorScheme ?? 'light'].text}>
            {list.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress >
          <CircleProgress
            filled={totalWithAmount}
            progress={totalUn && totalWithAmount ? Number(totalWithAmount / totalUn) : 0}
            total={totalUn}
            size={80} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerHeaderInnerFilterButtons>
        <FilterButtons tags={list.tags} filter={filter} setFilter={setFilter} />
      </Styled.ContainerHeaderInnerFilterButtons>
      <Styled.ContainerBody >
        {list.items.length ? <ListGrid filter={filter} list={list} deleteItemList={handleDeleteItemList} /> : <EmptyList list={list.uuid} />}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

