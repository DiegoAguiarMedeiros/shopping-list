import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from './Button';
import { itemInterface } from '../../../../../types/types';
import { Link } from 'expo-router';
import InputText from './InputText';
import Select from '../../../../../components/InputSelect';
import Switch from '../../../../../components/Switch';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ListPriceGrid() {
  const [newItem, setNewItem] = useState('1');
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(true);
  const colorScheme = useColorScheme();
  const onValueChange = () => {
    setSelectedValueSwitch(!selectedValueSwitch)
  }
  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>

      <Styled.ContainerMinusPlus >
        <Button icon='minus' invertSide={true} background={Colors[colorScheme ?? 'light'].buttonBackground} />
      </Styled.ContainerMinusPlus >
      <Styled.ContainerQtd >
        <InputText placeholder='Valor' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.ContainerQtd >
      <Styled.ContainerMinusPlus >
        <Button icon='plus' background={Colors[colorScheme ?? 'light'].buttonBackground} />
      </Styled.ContainerMinusPlus >
    </Styled.Container >
  );
}

