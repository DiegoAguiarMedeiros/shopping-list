import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import ItemList from './components/ItemList';
import TotalBar from './components/TotalBar';
import ModalAddItem from './components/modalAddItem';
import { useState } from 'react';
import Button from '../../components/Button';

const itemsArr: string[] = []

export default function Home() {
  const [items, setItems] = useState(itemsArr);
  const [item, setItem] = useState('');
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();


  const setItemInArray = (newItem: string) => {
    setItems([...items, newItem]);
    setOpen(!open);
  }
  const closeOpen = (event: GestureResponderEvent) => {
    setOpen(!open);
  }


  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      {open && <ModalAddItem setItems={setItemInArray} openClose={closeOpen} />}
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
                <ItemList items={items} />
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerList>
          <Styled.ContainerTotal border={Colors[colorScheme ?? 'light'].border}>
            <TotalBar items={items} />
          </Styled.ContainerTotal>
        </>}
      <Styled.ContainerButtonAdd>
        <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={closeOpen} />
      </Styled.ContainerButtonAdd>
    </Styled.Container>
  );
}

