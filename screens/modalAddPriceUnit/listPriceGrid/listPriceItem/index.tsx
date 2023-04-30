import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { itemInterface } from '../../../../types/types';
import { Link } from 'expo-router';
import InputText from '../../../../components/InputText';
import Select from '../../../../components/InputSelect';
import Switch from '../../../../components/Switch';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ListPriceGrid() {
  const [newItem, setNewItem] = useState('');
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(true);
  const colorScheme = useColorScheme();
  const onValueChange = () => {
    setSelectedValueSwitch(!selectedValueSwitch)
  }
  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerPrice>
        <Styled.Price text={Colors[colorScheme ?? 'light'].textButton}>
          R$ 25,40
        </Styled.Price>
      </Styled.ContainerPrice>
      <Styled.ContainerQtd>
        <InputText placeholder='QTD...' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.ContainerQtd>
      <Styled.ContainerInput>
        <Switch
          value={selectedValueSwitch}
          onValueChange={onValueChange}
          label={{ on: 'Kg', off: 'Un' }}
        />
      </Styled.ContainerInput>
      <Styled.ContainerTrash>
        <FontAwesome size={28} style={{ marginBottom: -3 }} name={'trash'} color={Colors[colorScheme ?? 'light'].textButton} />
      </Styled.ContainerTrash>
    </Styled.Container >
  );
}

