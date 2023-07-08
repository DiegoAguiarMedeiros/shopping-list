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
  const { list, setList } = useShoppingListContext();
  const { listId } = useSearchParams();
  const listArr = list[Array.isArray(listId) ? '' : listId!]
  const [filteredList, setFilteredList] = useState<itemInterface[]>()
  const [filter, setFilter] = useState('Todos');

  const colorScheme = useColorScheme();
  // const totalWithAmount = list.items ? getTotalWithAmount(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;
  // const totalUn = list.items ? getTotalUn(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items) : 0;

  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeItem(list, listArr.uuid, uuid)
    setList(newList);
  }

  useEffect(() => {
    const newFilteredList = listArr.items.filter((item: itemInterface) => item.tags === filter)
    setFilteredList(newFilteredList)
  }, [filter])

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerHeader >
        <Styled.ContainerHeaderInnerText>
          <Styled.ListTitle text={Colors[colorScheme ?? 'light'].text}>
            {listArr.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress >
          <CircleProgress
            filled={/*totalWithAmount*/1}
            progress={1/*totalUn && totalWithAmount ? Number(totalWithAmount / totalUn) : 0*/}
            total={1/*totalUn*/}
            size={60} />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerHeaderInnerFilterButtons>
        <FilterButtons tags={listArr.tags} filter={filter} setFilter={setFilter} />
      </Styled.ContainerHeaderInnerFilterButtons>
      <Styled.ContainerBody >
        {listArr.items ? <ListGrid filter={filter} list={listArr} deleteItemList={handleDeleteItemList} /> : <EmptyList list={listArr.uuid} />}
      </Styled.ContainerBody>
    </Styled.Container >
  )
}

