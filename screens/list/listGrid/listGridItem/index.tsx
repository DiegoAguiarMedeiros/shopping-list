import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { BottomSheetProps, itemInterface } from '../../../../types/types';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotalAmount, getTotalAmountUn } from '../../../../utils/functions';

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
  const handlePressIn = () => {
    setBottomSheetProps({
      listId,
      items: item,
      action: 'editListItem',
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item)
    })
  }

  return (


    <Styled.ContainerListItemListItem onPress={handlePressIn} background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter}>
      <Styled.ContainerListItemListItemHead>
        <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
          {item.name}
        </Styled.ContainerItemTextTitle>
        <Styled.ContainerItemTextIcon text={Colors[colorScheme ?? 'light'].textButton} onPress={deleteItem}>
          <FontAwesome size={28} style={{ marginBottom: -3 }} name={'trash'} color={Colors[colorScheme ?? 'light'].primary} />
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
    </ Styled.ContainerListItemListItem>
  );
}

