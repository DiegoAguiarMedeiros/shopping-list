import {
  useColorScheme,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { lazy, useEffect, useState } from 'react';
import { BottomSheetProps, itemInterface, listInterface } from '../../../types/types';
import ListGridItem from './listGridItem'
import { getTotal, getTotalUn } from '../../../utils/functions';

const Button = lazy(() => import('../../../components/Button'));
const BottomSheetComponent = lazy(() => import('../../../components/BottomSheetComponent'));
interface ListProps {
  filter: string;
  list: listInterface;
  deleteItemList: (uuid: string) => void;
}

export default function ListGrid({ filter, list, deleteItemList }: ListProps) {
  const colorScheme = useColorScheme();
  const [filteredList, setFilteredList] = useState<itemInterface[]>()
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: list.uuid,
    buttonText: 'add',
    action: 'addListItem',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  useEffect(() => {
    const newFilteredList = list.items.filter((item: itemInterface) => item.tags === filter)
    setFilteredList(newFilteredList)
  }, [filter])

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerList >
        <Styled.ContainerListInner>
          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText text={Colors[colorScheme ?? 'light'].text}>
              Total Items: {1/*getTotalUn(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items)*/}
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText text={Colors[colorScheme ?? 'light'].text}>
              Total : R$ {1/*getTotal(filteredList !== undefined && filteredList.length > 0 ? filteredList : list.items).toFixed(2)*/}
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView >
              <ScrollView style={[{ height: '100%' }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem height={/*filter === 'Todos' ? `${list.items.length * 100 + 410}` : `${filteredList!.length * 100 + 410}`*/'150'}>
                  {filter === 'Todos' ?
                    list.items.map((item: itemInterface) => (
                      <ListGridItem key={'ListGridItem-' + item.uuid} setBottomSheetProps={setBottomSheetProps} deleteItemList={deleteItemList} item={item} listId={list.uuid} />
                    ))
                    :
                    filteredList?.map((item: itemInterface) => (
                      <ListGridItem key={'ListGridItem-' + item.uuid} setBottomSheetProps={setBottomSheetProps} deleteItemList={deleteItemList} item={item} listId={list.uuid} />
                    ))
                  }
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>

          </Styled.ContainerListItemList>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' onPress={() => setBottomSheetProps({ ...bottomSheetProps, isVisible: true })} background={Colors[colorScheme ?? 'light'].buttonBackground} icon="plus" />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListInner >
      </Styled.ContainerList >
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container >
  );
}
