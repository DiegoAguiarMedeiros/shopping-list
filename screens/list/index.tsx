import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import React, { lazy, useEffect, useState } from 'react';
import { useSearchParams } from "expo-router";
import { useShoppingListContext } from '../../context/ShoppingList';
import { itemInterface } from '../../types/types';
import { getTotalUn, getTotalWithAmount, removeItem } from '../../utils/functions';

const EmptyList = lazy(() => import('./emptyList'));
const ListGrid = lazy(() => import('./listGrid'));
const CircleProgress = lazy(() => import('../../components/CircleProgress'));
const FilterButtons = lazy(() => import('../../components/FilterButtons'));

interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../assets/images/empty.png'),
};



export default function List() {
  const { value, setValue } = useShoppingListContext();
  const { listId } = useSearchParams();
  const list = value.filter(({ uuid }) => (uuid === listId))[0]
  const [filteredList, setFilteredList] = useState<itemInterface[]>()
  const [filter, setFilter] = useState('Todos');

  const colorScheme = useColorScheme();
  const totalWithAmount = list.items ? getTotalWithAmount(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;
  const totalUn = list.items ? getTotalUn(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;

  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeItem(value, list.uuid, uuid)
    setValue(newList);
  }

  useEffect(() => {
    const newFilteredList = list.items.filter((item: itemInterface) => item.tags === filter)
    setFilteredList(newFilteredList)
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
            size={60} />
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

