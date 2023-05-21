import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import Button from '../Button';
import InputText from '../InputText';
import { BottomSheetProps, itemInterface, listInterface } from '../../types/types';
import UUIDGenerator from 'react-native-uuid';
import { useShoppingListContext } from '../../context/ShoppingList';
import { getTags } from '../../utils/functions';

const AnimatedBottomSheet = Animated.createAnimatedComponent(Styled.BottomSheet);

const BottomSheetComponent: React.FC<BottomSheetProps> = ({ items, isVisible, children, onClose, action, listId, buttonText }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const { value, setValue } = useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : '',
    tag: items && !Array.isArray(items.tags) ? items.tags : '',
    edit: false,
  });
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
          tags: getTags(newItemList),
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
    const newList = value.map((item) => {
      if (item.uuid == listId) {
        item.items.unshift(returnNewItem())
        item.tags = getTags(item.items);
      }
      return item;
    })

    setValue(newList);

  }

  const handleCopyListItem = (): void => {
    handleHideBottomSheet()
    const copiedObject: listInterface = JSON.parse(JSON.stringify(items));

    // Generate new UUID for the main object
    copiedObject.uuid = String(UUIDGenerator.v4());
    copiedObject.name = newItem.item;
    // Generate new UUIDs for each nested item
    const newList = copiedObject.items.map(item => {
      return {
        ...item,
        uuid: String(UUIDGenerator.v4()),
        amount: [],
      };
    })
    copiedObject.items = newList;
    setValue([copiedObject, ...value])
  }

  const buttonTextArr = {
    add: 'Adicionar',
    edit: 'Editar',
    copy: 'Copiar',
  }

  const functions = {
    addList: handleAddList,
    editList: handleEditList,
    addListItem: handleAddListItem,
    editListItem: handleEditListItem,
    copyList: handleCopyListItem,
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
      buttonText,
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
              <Button text='Cancelar' background={Colors[colorScheme ?? 'light'].cancelButtonBackground} onPress={handleHideBottomSheet} />
            </Styled.ButtonWrapper>
            <Styled.ButtonWrapper>
              <Button text={buttonTextArr[buttonText]} background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={functions[action]} />
            </Styled.ButtonWrapper>
          </Styled.ButtonsContainer>

        </Styled.Container>
      </AnimatedBottomSheet>

    </TouchableOpacity >
  );
};

export default BottomSheetComponent;