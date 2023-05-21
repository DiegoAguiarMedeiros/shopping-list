import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
  Animated,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { BottomSheetProps, itemInterface } from '../../../../types/types';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotalAmount, getTotalAmountUn } from '../../../../utils/functions';
import { Swipeable } from 'react-native-gesture-handler';

interface listProps {
  item: itemInterface,
  listId: string,
  deleteItemList: (uuid: string) => void,
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>,

}


export default function ListGridItem({ item, listId, deleteItemList, setBottomSheetProps }: listProps) {
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
    router.push({ pathname: "/modalAdd", params: { listId: listId, listItemId: item.uuid } });
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

  return (

    <Swipeable renderLeftActions={LeftRightSwipe} renderRightActions={LeftRightSwipe} leftThreshold={100}>
      <Styled.ContainerListItemListItem underlayColor={Colors[colorScheme ?? 'light'].backgroundTouchableHighlight} onPress={handleOpen} background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter}>
        <>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
              {item.name}
            </Styled.ContainerItemTextTitle>
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
      </ Styled.ContainerListItemListItem>
    </Swipeable>
  );
}

