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
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


interface listProps {
  item: itemInterface,
}


export default function ListGridItem({ item }: listProps) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [active, setActive] = useState(false);



  const handlePressIn = () => {
    console.log('aaaasda')
    setActive(true)
  }
  const handlePressOut = () => {
    setActive(false)
  }

  return (


    <Styled.ContainerListItemListItem background={active ? Colors[colorScheme ?? 'light'].backgroundLighterActive : Colors[colorScheme ?? 'light'].backgroundLighter}>
        <Styled.ContainerListItemListItemHead>
          <Styled.ContainerItemTextTitle text={Colors[colorScheme ?? 'light'].textButton}>
            {item.item}
          </Styled.ContainerItemTextTitle>
          <Styled.ContainerItemTextIcon text={Colors[colorScheme ?? 'light'].textButton}>
            <FontAwesome size={28} style={{ marginBottom: -3 }} name={item.active ? 'check-square-o' : 'square-o'} color={item.active ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].secondary} />
          </Styled.ContainerItemTextIcon>
        </Styled.ContainerListItemListItemHead>
        <Styled.ContainerListItemListItemBody>
          <Styled.ContainerItemTextQtd text={Colors[colorScheme ?? 'light'].textButton}>
            QTD: 2000
          </Styled.ContainerItemTextQtd>
          <Styled.ContainerItemTextPriceUnit text={Colors[colorScheme ?? 'light'].textButton}>
            Un: R$ 1000,00
          </Styled.ContainerItemTextPriceUnit>
          <Styled.ContainerItemTextPriceTotal text={Colors[colorScheme ?? 'light'].textButton}>
            Total: R$ 2000,00
          </Styled.ContainerItemTextPriceTotal>

        </Styled.ContainerListItemListItemBody>
    </ Styled.ContainerListItemListItem>
  );
}

