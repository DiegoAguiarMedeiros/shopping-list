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
import { itemAmountInterface, itemInterface } from '../../../../types/types';
import { Link } from 'expo-router';
import InputText from '../../../../components/InputText';
import Select from '../../../../components/InputSelect';
import Switch from '../../../../components/Switch';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AddQtd from './addQtd'


interface listProps {
  itemAmount: itemAmountInterface,
  removeAmount: (itemAmountUuid: string) => void;
  editItemsAmount: (id: string, amount: string, type: boolean) => void;
}

export default function ListPriceGrid({ itemAmount, editItemsAmount, removeAmount }: listProps) {
  const [newItemAmountQtd, setNewItemAmountQtd] = useState(String(itemAmount.quantity));
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(itemAmount.type);
  const colorScheme = useColorScheme();
  const onValueChange = () => {
    setSelectedValueSwitch(!selectedValueSwitch)
  }
  const handleRemoveAmount = (): void => {
    removeAmount(itemAmount.uuid);
  }

  const handleChangeAMount = (): void => {
    editItemsAmount(itemAmount.uuid, newItemAmountQtd, selectedValueSwitch)
  }

  const formatInput = (value: string) => {
    // Remove any non-digit characters from the input
    const numericValue = (Number(value.replace(/\D/g, '').replace('.', '')) / 1000).toFixed(3);
    return numericValue;
  };

  const handleInputChange = (value: string) => {
    const formattedValue = formatInput(value);
    setNewItemAmountQtd(formattedValue);
  };
  useEffect(() => {
    handleChangeAMount();
  }, [newItemAmountQtd])

  return (
    <Styled.Container>
      <Styled.ContainerPrice>
        <Styled.Price text={Colors[colorScheme ?? 'light'].textButton}>
          R$ {itemAmount.amount}
        </Styled.Price>
      </Styled.ContainerPrice>
      <Styled.ContainerQtd>
        {selectedValueSwitch ?
          <InputText keyboardType='decimal-pad' placeholder='0.000' onChangeText={handleInputChange} value={newItemAmountQtd} />
          :
          <AddQtd setNewItemAmount={setNewItemAmountQtd} amount={newItemAmountQtd} />
        }
      </Styled.ContainerQtd>
      <Styled.ContainerInput>
        <Switch
          value={selectedValueSwitch}
          onValueChange={onValueChange}
          label={{ on: 'Kg', off: 'Un' }}
        />
      </Styled.ContainerInput>
      <Styled.ContainerTrash>
        <FontAwesome size={28} style={{ marginBottom: -3 }} name={'trash'} color={Colors[colorScheme ?? 'light'].primary} onPress={handleRemoveAmount} />
      </Styled.ContainerTrash>
    </Styled.Container >
  );
}

