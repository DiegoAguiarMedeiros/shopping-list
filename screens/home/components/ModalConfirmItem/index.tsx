import { FontAwesome } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native';
import Button from '../../../../components/Button';
import Select from '../../../../components/InputSelect';
import InputText from '../../../../components/InputText';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';

import { itemInterface } from '../../../../types/types';

interface itemProps {
    itemsList: itemInterface
    setItems: (newItem: itemInterface) => void
    openClose: () => void,
    itemActiveOnModal: number,
}


export default function ModalAddItem({ itemsList, setItems, openClose, itemActiveOnModal }: itemProps) {
    const [amountItem, setAmountItem] = useState('');
    const [selectedValue, setSelectedValue] = useState('1');
    const colorScheme = useColorScheme();

    const unitSelect = [
        { label: 'un', value: '1' },
        { label: 'kg', value: '2' },
    ];

    const addAmountItem = () => {
        const item = { ...itemsList }
        item.active = true;
        item.quantity = 1;
        item.amount = Number(amountItem);
        setItems(item);
        openClose();
    }

    const handleValueChange = (itemValue: unknown, itemIndex: number) => {
        console.log('a')
    }

    return (
        <>
            <Styled.ContainerOpacity background={Colors[colorScheme ?? 'light'].background}>
            </Styled.ContainerOpacity>
            <Styled.Container background={Colors[colorScheme ?? 'light'].backgroundLighter} border={Colors[colorScheme ?? 'light'].border}>
                <Styled.ModalBody
                    border={Colors[colorScheme ?? 'light'].border}
                    background={Colors[colorScheme ?? 'light'].backgroundLighter}
                >
                    <Styled.ModalHeader border={Colors[colorScheme ?? 'light'].border}>
                        <Styled.ModalTitle text={Colors[colorScheme ?? 'light'].text}>
                            {itemsList.item}
                        </Styled.ModalTitle>
                    </Styled.ModalHeader>
                    <Select
                        items={unitSelect}
                        selectedValue={selectedValue}
                        onValueChange={handleValueChange}
                    />
                    <Styled.ModalBodyInner border={Colors[colorScheme ?? 'light'].border}>
                        <InputText placeholder='Valor...' keyboardType="numeric" onChangeText={(amount) => { setAmountItem(amount); }} value={amountItem} />
                    </Styled.ModalBodyInner>

                    <Styled.ContainerButtonAdd border={Colors[colorScheme ?? 'light'].border}>
                        <Styled.ContainerButtonAddInner>
                            <Button text='Cancelar' background={Colors[colorScheme ?? 'light'].cancelButtonBackground} onPress={openClose} />
                        </Styled.ContainerButtonAddInner>
                        <Styled.ContainerButtonAddInner>
                            <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={addAmountItem} />
                        </Styled.ContainerButtonAddInner>
                    </Styled.ContainerButtonAdd>
                </Styled.ModalBody>
            </Styled.Container >
        </>
    );
}

