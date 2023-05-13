import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  KeyboardAvoidingView
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../Button';
import InputText from '../InputText';
import { useRouter, useSearchParams } from "expo-router";

import { BottomSheetProps, itemInterface, listInterface, listType } from '../../types/types';
import UUIDGenerator from 'react-native-uuid';
import { useShoppingListContext } from '../../context/ShoppingList';



// export default function Modal() {
// const { value, setValue } = useShoppingListContext();
// const { listId } = useSearchParams();
// const [newItem, setNewItem] = useState({
//   item: '',
//   tag: '',
// });
// const router = useRouter();//back
// const colorScheme = useColorScheme();


// const handleSetList = (): void => {
//   value ? setValue([returnNewList(), ...value]) : setValue([returnNewList()]);
// }

// const returnNewList = (): listInterface => {
//   const item: listInterface = {
//     uuid: String(UUIDGenerator.v4()),
//     name: newItem.item,
//     tags: [],
//     items: []
//   }
//   return item;
// }
// const returnNewItem = (): itemInterface => {
//   const item: itemInterface = {
//     uuid: String(UUIDGenerator.v4()),
//     item: newItem.item,
//     active: false,
//     tags: newItem.tag,
//     amount: []
//   }
//   return item;
// }

// const handleSetItemInList = (): void => {

//   const newList = value.map((item, index) => {
//     item.uuid == listId ? item.items.push(returnNewItem()) : item;
//     return item;
//   })

//   setValue(newList);
//   router.push({ pathname: "/iTems", params: { listId: listId } });
// }

// //   return (

// <Styled.Container background={Colors[colorScheme ?? 'light'].background}>

//   <Styled.InputContainer>
//     <InputText placeholder={listId ? 'Nome do item...' : 'Nome da sua lista...'} onChangeText={(item) => {
//       setNewItem({
//         item: item,
//         tag: newItem.tag,
//       });
//     }} value={newItem.item} />
//   </Styled.InputContainer>
//   {listId ? <Styled.InputContainer>
//     <InputText placeholder='Nome da categoria...' onChangeText={(tag) => {
//       setNewItem({
//         item: newItem.item,
//         tag: tag,
//       });
//     }} value={newItem.tag} />
//   </Styled.InputContainer> : null}


//   <Styled.ButtonsContainer>
//     <Styled.ButtonWrapper>
//       <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} />
//     </Styled.ButtonWrapper>
//     <Styled.ButtonWrapper>
//       <Button text='Adicionar' background={Colors['light'].buttonBackground} onPress={listId ? handleSetItemInList : handleSetList} />
//     </Styled.ButtonWrapper>
//   </Styled.ButtonsContainer>

// </Styled.Container>
//   );
// }

import React, { useRef } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';




const AnimatedBottomSheet = Animated.createAnimatedComponent(Styled.BottomSheet);

const BottomSheetComponent: React.FC<BottomSheetProps> = ({ items, isVisible, children, onClose, action, listId }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : '',
    tag: items && !Array.isArray(items.tags) ? items.tags : '',
    edit: false,
  });
  const router = useRouter();//back
  //TODO enviar essas função para o arquivo de funcções
  const returnNewList = (): listInterface => {
    const item: listInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tags: [],
      items: []
    }
    return item;
  }
  const returnNewItem = (): itemInterface => {
    const item: itemInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      active: false,
      tags: newItem.tag,
      amount: []
    }
    return item;
  }

  const handleAddList = (): void => {
    handleHideBottomSheet()
    value ? setValue([returnNewList(), ...value]) : setValue([returnNewList()]);
  }


  const handleEditList = (): void => {

    handleHideBottomSheet();
    const newList = value.map((item) => {
      if (item.uuid === items?.uuid) {
        return {
          ...item,
          name: newItem.item,
        };
      } else {
        return item;
      }
    });
    setValue(newList);
  }
  const handleEditListItem = (): void => {

    handleHideBottomSheet();
    const newList = value.map((item) => {
      if (item.uuid === listId) {
        const newItemList = item.items.map((itemList) => {
          console.log('itemList.uuid === items?.uuid', itemList.uuid === items?.uuid)
          if (itemList.uuid === items?.uuid) {
            return {
              ...itemList,
              name: newItem.item,
              tags: newItem.tag,
            };
          } else {
            return itemList;
          }
        })
        return {
          ...item,
          items: newItemList,
        };
      } else {
        return item;
      }
    });
    setValue(newList);
  }


  const handleAddListItem = (): void => {
    handleHideBottomSheet()
    const newList = value.map((item, index) => {
      item.uuid == listId ? item.items.unshift(returnNewItem()) : item;
      return item;
    })

    setValue(newList);

  }

  const functions = {
    addList: handleAddList,
    editList: handleEditList,
    addListItem: handleAddListItem,
    editListItem: handleEditListItem,
  }


  useEffect(() => {
    setNewItem({
      item: items ? items.name : '',
      tag: items && !Array.isArray(items.tags) ? items.tags : '',
      edit: false,
    });
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, animation]);

  const close = () => {
    onClose({
      action,
      isVisible: false,
      onClose
    });
  }
  const handleHideBottomSheet = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      clearInput();
      close();
    });
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  if (!isVisible) {
    return null;
  }

  const clearInput = () => {
    setNewItem({
      item: '',
      tag: '',
      edit: false,
    })
  }
  const handleOpenList = () => {
    handleHideBottomSheet()
    listId ?
      router.push({ pathname: "/modalAdd", params: { listId: listId, listItemId: items?.uuid } })
      :
      router.push({ pathname: "/iTems", params: { listId: items?.uuid } })

  }

  return (
    <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={handleHideBottomSheet}>
      <AnimatedBottomSheet style={{ height: 250, backgroundColor: Colors[colorScheme ?? 'light'].backgroundLighterActive, transform: [{ translateY }] }}>
        {/* <Button onPress={handleHideBottomSheet} background={Colors[colorScheme ?? 'light'].buttonBackground}>
          <Text>Close</Text>
        </Button> */}
        <Styled.Container>

          <Styled.InputContainer>
            <InputText placeholder={listId ? 'Nome do item...' : 'Nome da sua lista...'} onChangeText={(item) => {
              setNewItem({
                item: item,
                tag: newItem.tag,
                edit: true,
              });
            }} value={newItem.item} />
          </Styled.InputContainer>
          {listId ? <Styled.InputContainer>
            <InputText placeholder='Nome da categoria...' onChangeText={(tag) => {
              setNewItem({
                item: newItem.item,
                tag: tag,
                edit: true,
              });
            }} value={newItem.tag} />
          </Styled.InputContainer> : null}


          <Styled.ButtonsContainer>
            <Styled.ButtonWrapper>
              <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} onPress={handleHideBottomSheet} />
            </Styled.ButtonWrapper>
            <Styled.ButtonWrapper>
              <Button text={items?.name ? newItem.edit ? 'Editar' : 'Abrir' : 'Adicionar'} background={Colors['light'].buttonBackground} onPress={items?.name ? newItem.edit ? functions[action] : handleOpenList : functions[action]} />
            </Styled.ButtonWrapper>
          </Styled.ButtonsContainer>

        </Styled.Container>
      </AnimatedBottomSheet>

    </TouchableOpacity >
  );
};

export default BottomSheetComponent;
