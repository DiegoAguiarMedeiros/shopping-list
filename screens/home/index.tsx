import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import ItemList from './components/ItemList';
import TotalBar from './components/TotalBar';
import ModalAddItem from './components/ModalAddItem';
import ModalConfirmItem from './components/ModalConfirmItem';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemInterface } from '../../types/types';


const itemsArr: itemInterface[] = []

export default function Home() {
  const [items, setItems] = useState(itemsArr);
  const [itemActiveOnModal, setItemActiveOnModal] = useState(0);
  const [openModalAddItem, setOpenModalAddItem] = useState(false);
  const [openModalConfirmItem, setOpenModalConfirmItem] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemTotalActive, setItemTotalActive] = useState(0);
  const [itemAmountTotal, setItemAmountTotal] = useState(0);
  const colorScheme = useColorScheme();


  const setItemInArray = (newItem: itemInterface) => {
    activeItems();
    setItems([...items, newItem]);
    setOpenModalAddItem(!openModalAddItem);
  }
  const editItemInArray = (newItem: itemInterface) => {
    const listItems = items;
    listItems.map((listItem, index) => {
      if (listItem.id === newItem.id) {
        listItems[index] = newItem;
      }
    })
    activeItems();
    totalAmout();
    setItems(listItems);
    setOpenModalConfirmItem(!openModalAddItem);
  }
  const closeOpenModalAddItem = () => {
    setOpenModalAddItem(!openModalAddItem);
  }
  const setItemOnActiveOnModal = (id: number) => {
    setItemActiveOnModal(id);
  }
  const closeOpenModalConfirmItem = () => {
    setOpenModalConfirmItem(!openModalConfirmItem);
  }
  const removeFromList = (id: number) => {
    activeItems();
    totalAmout();
    const newItemsArr = items.filter((item) => item.id !== id);
    setItems(newItemsArr);
    return null;
  }

  const returItemSelected = (): itemInterface => {
    const itemSelected = items.filter(item => item.id === itemActiveOnModal);
    return itemSelected[0];
  }


  const activeItems = () => {
    const active = items.filter((item) => item.active)
    setItemQuantity(items.length)
    setItemTotalActive(active.length)
  }
  const totalAmout = () => {
    const result = items.reduce(function (acumulador, objetoAtual) {
      const amount = objetoAtual.amount != undefined ? objetoAtual.amount : 0;
      return acumulador + amount;
    }, 0);
    setItemAmountTotal(result)
  }

  useEffect(() => {
  
  }, [items]);


  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      {openModalAddItem && <ModalAddItem itemsList={items} setItems={setItemInArray} openClose={closeOpenModalAddItem} />}
      {openModalConfirmItem && <ModalConfirmItem itemsList={returItemSelected()} setItems={editItemInArray} openClose={closeOpenModalConfirmItem} itemActiveOnModal={itemActiveOnModal} />}
      {items.length === 0 ?
        <Styled.ContainerListEmpty >
          <Styled.ContainerListEmptyInner >
            <Styled.ListEmptyTitle text={Colors[colorScheme ?? 'light'].text}>
              Lista Vazia!
            </Styled.ListEmptyTitle>
          </Styled.ContainerListEmptyInner>
        </Styled.ContainerListEmpty>
        :
        <>
          <Styled.ContainerList >
            <SafeAreaView >
              <ScrollView >
                <ItemList items={items} removeFromList={removeFromList} openClose={closeOpenModalConfirmItem} setItemActiveOnModal={setItemOnActiveOnModal} />
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerList>
          <Styled.ContainerTotal border={Colors[colorScheme ?? 'light'].border}>
            <TotalBar totalAmount={String(itemAmountTotal)} totalActive={String(itemTotalActive)} totalItems={String(itemQuantity)} />
          </Styled.ContainerTotal>
        </>}
      <Styled.ContainerButtonAdd>
        <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={closeOpenModalAddItem} />
      </Styled.ContainerButtonAdd>
    </Styled.Container>
  );
}

