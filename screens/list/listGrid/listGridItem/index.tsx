import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import { itemInterface } from '../../../../types/types';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotal } from '../../../../utils/functions';


interface listProps {
  item: itemInterface,
  listId: string,
  total: number,
  deleteItemList: (uuid: string) => void

}


export default function ListGridItem({ item, total, listId, deleteItemList }: listProps) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const router = useRouter();

  const deleteItem = () => {
    deleteItemList(item.uuid)
  }
  const handleOpenItem = () => {
    router.push({ pathname: "/modalAdd", params: { listId: listId, listItemId: item.uuid } });
  }

  return (


    <Styled.ContainerListItemListItem onPress={handleOpenItem} background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter}>
      <Styled.ContainerListItemListItemHead>
        <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
          {item.item}
        </Styled.ContainerItemTextTitle>
        <Styled.ContainerItemTextIcon text={Colors[colorScheme ?? 'light'].textButton} onPress={deleteItem}>
          <FontAwesome size={28} style={{ marginBottom: -3 }} name={'trash'} color={Colors[colorScheme ?? 'light'].primary} />
        </Styled.ContainerItemTextIcon>
      </Styled.ContainerListItemListItemHead>
      <Styled.ContainerListItemListItemBody>
        <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
          Total: R$ {total.toFixed(2)}
        </Styled.ContainerItemTextPriceTotal>

      </Styled.ContainerListItemListItemBody>
    </ Styled.ContainerListItemListItem>
  );
}

