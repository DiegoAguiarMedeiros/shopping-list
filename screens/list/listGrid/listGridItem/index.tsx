import {
  useColorScheme, SafeAreaView,
  StyleSheet,
  ScrollView,
  GestureResponderEvent,
  Linking,
  Animated,
  View,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import React, { useEffect, useState } from 'react';
import { BottomSheetProps, itemAmountInterface, itemInterface } from '../../../../types/types';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotalAmount, getTotalAmountUn } from '../../../../utils/functions';
import { Swipeable } from 'react-native-gesture-handler';
import AddPriceUnit from '../../../modalAddPriceUnit';
import { Title } from '../../../../components/Text';

interface listProps {
  item: itemInterface,
  listId: string,
  deleteItemList: (uuid: string) => void,
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,

}


function ListGridItem({ item, listId, deleteItemList, setBottomSheetProps }: listProps) {
  console.log('amount.length', item)
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const router = useRouter();

  const deleteItem = () => {
    deleteItemList(item.uuid)
  }
  const handleEdit = () => {
    setBottomSheetProps({
      listId,
      items: item,
      buttonText: 'edit',
      action: 'editListItem',
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item)
    })
  }
  const handleOpen = () => {
    setActive(!active)
  }

  function LeftRightSwipe(progress: any, dragX: { interpolate: (arg0: { inputRange: number[]; outputRange: number[] }) => any }) {

    return (
      <Animated.View style={{
        width: 200,
        height: 100,
        overflow: 'hidden',
      }}>
        <Styled.ButtonView>
          <Styled.ButtonInner underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={handleEdit}>
            <>
              <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
                <FontAwesome size={24} style={{ marginBottom: -3 }} name="pencil" />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton}>
                Editar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={deleteItem}>
            <>
              <Styled.ButtonTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
                <FontAwesome size={24} style={{ marginBottom: -3 }} name="trash" />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={Colors[colorScheme ?? 'light'].textButton}>
                Deletar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View >
    )
  }
  const handleRemoveAmount = (itemAmountUuid: string): void => {
    // removeAmount(item.uuid, itemAmountUuid);
  }
  const editItemsAmount = (itemAmountUuid: string): void => {
    // removeAmount(item.uuid, itemAmountUuid);
  }

  return (

    active

      ?
      < Styled.ContainerListItemListItem
        height={`${item.amount.length * 90 + 60 + 80}`}
        underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight}
        background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter} >
        <>
          <Styled.ContainerListItemListItemInner>
            <Styled.ContainerListItemListItemHead>
              <Styled.ContainerItemTextTitle>
                <Title>{item.name}</Title>
              </Styled.ContainerItemTextTitle>
              <Styled.ContainerItemTextIcon>
                <Title><FontAwesome onPress={handleOpen} size={28} style={{ marginBottom: -3 }} name="angle-up" /></Title>
              </Styled.ContainerItemTextIcon>
            </Styled.ContainerListItemListItemHead>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
                Total: R$ {getTotalAmount(item.amount)}
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
                Un: {getTotalAmountUn(item.amount)}
              </Styled.ContainerItemTextPriceTotal>

            </Styled.ContainerListItemListItemBody>

          </Styled.ContainerListItemListItemInner>
          <Styled.ContainerListItemListItemAMount
            height={`${item.amount.length * 90}`}
            background={Colors[colorScheme ?? 'light'].backgroundLighterActive}>
            <AddPriceUnit listId={listId} listItemId={item.uuid} />
          </Styled.ContainerListItemListItemAMount>
        </>
      </ Styled.ContainerListItemListItem >
      :

      <Swipeable renderLeftActions={LeftRightSwipe} renderRightActions={LeftRightSwipe} leftThreshold={100}>
        < Styled.ContainerListItemListItem
          height='80'
          underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight}

          background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter} >
          <>
            <Styled.ContainerListItemListItemHead>
              <Styled.ContainerItemTextTitle>
                <Title>{item.name}</Title>
              </Styled.ContainerItemTextTitle>
              <Styled.ContainerItemTextIcon>
                <Title><FontAwesome onPress={handleOpen} size={28} style={{ marginBottom: -3 }} name="angle-down" /></Title>
              </Styled.ContainerItemTextIcon>
            </Styled.ContainerListItemListItemHead>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
                Total: R$ {getTotalAmount(item.amount)}
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
                Un: {getTotalAmountUn(item.amount)}
              </Styled.ContainerItemTextPriceTotal>

            </Styled.ContainerListItemListItemBody>
          </>
        </ Styled.ContainerListItemListItem >
      </Swipeable >
  );
}

export default React.memo(ListGridItem);