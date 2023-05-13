import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { BottomSheetProps, itemInterface, listInterface } from '../../../types/types';
import { Link, useRouter } from 'expo-router';
import ListGridItem from './listGridItem'
import { useShoppingListContext } from '../../../context/ShoppingList';
import { getTotal, getTotalUn } from '../../../utils/functions';
import BottomSheetComponent from '../../../components/BottomSheetComponent';

interface listProps {
  list: listInterface,
  deleteItemList: (uuid: string) => void
}

export default function ListGrid({ list, deleteItemList }: listProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: list.uuid,
    action: 'addListItem',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  const handleOpenList = () => {
    router.push({ pathname: "/modal", params: { listId: list.uuid } });
  }
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background} >
      <Styled.ContainerList >
        <Styled.ContainerListInner>
          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText text={Colors[colorScheme ?? 'light'].text}>
              Total Items: {getTotalUn(list.items)}
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText text={Colors[colorScheme ?? 'light'].text}>
              Total : R$ {getTotal(list.items).toFixed(2)}
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView >
              <ScrollView>
                <Styled.ContainerListItemListItem>
                  {list.items.map((item: itemInterface) => (
                    <ListGridItem setBottomSheetProps={setBottomSheetProps} deleteItemList={deleteItemList} item={item} listId={list.uuid} />
                  ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>

          </Styled.ContainerListItemList>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' onPress={() => setBottomSheetProps({ ...bottomSheetProps, isVisible: true })} background={Colors['light'].buttonBackground} icon="plus" />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListInner >
      </Styled.ContainerList >
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container >
  );
}

