import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemInterface } from '../../types/types';
import { Link } from 'expo-router';
import InputText from '../../components/InputText';
import Select from '../../components/InputSelect';
import Switch from '../../components/Switch';


const unitSelect = [
  { label: 'Un', value: '1' },
  { label: 'kg', value: '2' },
];
export default function ModalAddPriceUnit() {

  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(true);
  const [newItem, setNewItem] = useState('');
  const colorScheme = useColorScheme();
  const handleValueChange = (itemValue: string, itemIndex: number) => {
    setSelectedValue(itemValue);
  };
  const onValueChange = () => {
    setSelectedValueSwitch(!selectedValueSwitch)
  }
  return (

    // <Styled.Container background={Colors[colorScheme ?? 'light'].backgroundLighter}>
    //   <Styled.ModalBody
    //     border={Colors[colorScheme ?? 'light'].border}
    //     background={Colors[colorScheme ?? 'light'].backgroundLighter}
    //   >
    //     <Styled.ModalHeader border={Colors[colorScheme ?? 'light'].border}>
    //       <Styled.ModalTitle text={Colors[colorScheme ?? 'light'].text}>
    //         {'a'}
    //       </Styled.ModalTitle>
    //     </Styled.ModalHeader>
    //     <Styled.ModalBodyInner border={Colors[colorScheme ?? 'light'].border}>
    //       <Styled.ContainerInputQauntity>
    //         <Styled.ContainerInputQauntityInner>

    //           <InputText placeholder='Quantidade...' keyboardType="numeric" value={'1'} />
    //         </Styled.ContainerInputQauntityInner>
    //         <Styled.ContainerInputQauntityInner>
    //           <Select
    //             items={unitSelect}
    //             selectedValue={selectedValue}
    //             onValueChange={handleValueChange}
    //           />
    //         </Styled.ContainerInputQauntityInner>
    //       </Styled.ContainerInputQauntity>
    //       <InputText placeholder='Valor...' keyboardType="numeric" value={'2'} />
    //     </Styled.ModalBodyInner>

    //     <Styled.ContainerButtonAdd border={Colors[colorScheme ?? 'light'].border}>
    //       <Styled.ContainerButtonAddInner>
    //         <Button text='Cancelar' background={Colors[colorScheme ?? 'light'].cancelButtonBackground} />
    //       </Styled.ContainerButtonAddInner>
    //       <Styled.ContainerButtonAddInner>
    //         <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} />
    //       </Styled.ContainerButtonAddInner>
    //     </Styled.ContainerButtonAdd>
    //   </Styled.ModalBody>
    // </Styled.Container >
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.InputContainer>
        <InputText placeholder='Quantidade' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Switch
          value={selectedValueSwitch}
          onValueChange={onValueChange}
          label={{ on: 'Kilograma', off: 'Unidade' }}
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <InputText placeholder='Valor' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.InputContainer>

      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button text='Adicionar' background={Colors['light'].buttonBackground} />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>

    </Styled.Container>
  );
}

