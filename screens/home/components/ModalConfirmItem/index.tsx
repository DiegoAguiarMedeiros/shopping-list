import { FontAwesome } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
    const [quantityItem, setQuantity] = useState('');
    const [selectedValue, setSelectedValue] = useState('1');
    const colorScheme = useColorScheme();

    const unitSelect = [
        { label: 'Un', value: '1' },
        { label: 'kg', value: '2' },
    ];

    const addAmountItem = () => {
        const selected = Number(selectedValue) - 1;
        const item = { ...itemsList }
        item.active = true;
        item.quantity = Number(quantityItem);
        item.amount = Number(amountItem);
        item.unit = unitSelect[selected].label;
        setItems(item);
        openClose();
    }

    const handleValueChange = (itemValue: string, itemIndex: number) => {
        setSelectedValue(itemValue);
    };

    useEffect(() => {
        const amount = itemsList.amount ? itemsList.amount : '';
        const quantity = itemsList.quantity ? itemsList.quantity : '';
        setAmountItem(amount.toString());
        setQuantity(quantity.toString());

        if (itemsList.unit !== undefined) {
            const units = unitSelect.filter((u) => u.label === itemsList.unit!)
            const unit = units.length > 0 ? units[0].value : '0';
            setSelectedValue(unit);
        }
    }, []);

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
                    <Styled.ModalBodyInner border={Colors[colorScheme ?? 'light'].border}>
                        <Styled.ContainerInputQauntity>
                            <Styled.ContainerInputQauntityInner>

                                <InputText placeholder='Quantidade...' keyboardType="numeric" onChangeText={(quantity) => { setQuantity(quantity.replace(',', '.')); }} value={quantityItem} />
                            </Styled.ContainerInputQauntityInner>
                            <Styled.ContainerInputQauntityInner>
                                <Select
                                    items={unitSelect}
                                    selectedValue={selectedValue}
                                    onValueChange={handleValueChange}
                                />
                            </Styled.ContainerInputQauntityInner>
                        </Styled.ContainerInputQauntity>
                        <InputText placeholder='Valor...' keyboardType="numeric" onChangeText={(amount) => { setAmountItem(amount.replace(',', '.')); }} value={amountItem} />
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

