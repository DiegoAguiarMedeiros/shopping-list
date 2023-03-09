import { FontAwesome } from '@expo/vector-icons';
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { itemInterface } from '../../../../types/types';

interface itemProps {
  items: itemInterface[],
  removeFromList: (id: number) => void,
  openClose: () => void,
  setItemActiveOnModal: (id: number) => void,
}



export default function ItemList({ items, removeFromList, openClose, setItemActiveOnModal }: itemProps) {
  const colorScheme = useColorScheme();

  const remove = (id: number) => {
    removeFromList(id);
    return null
  }

  const openModal = (id: number) => {
    setItemActiveOnModal(id);
    openClose();
    return null
  }

  

  const createList = (items: itemInterface[]) => {
    return items.map((item, index) => (
      <Styled.listItem border={Colors[colorScheme ?? 'light'].border} key={`listItem_${index}`} background={Colors[colorScheme ?? 'light'].backgroundLighter}>
        <Styled.listItemIconView>
          <Styled.listItemIconViewInner>
            <Styled.listItemIconViewInnerItemFirst>
              <Styled.titleList text={Colors[colorScheme ?? 'light'].text}>
                {item.item}
              </Styled.titleList >
            </Styled.listItemIconViewInnerItemFirst>
            <Styled.listItemIconViewInnerItem>
              <Pressable onPress={() => openModal(item.id)}>
                {({ pressed }) => (
                  <FontAwesome
                    name={item.active ? "pencil" :"check"}
                    size={30}
                    color={item.active ? Colors[colorScheme ?? 'light'].edit : Colors[colorScheme ?? 'light'].success }
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Styled.listItemIconViewInnerItem>
            <Styled.listItemIconViewInnerItem>
              <Pressable onPress={() => remove(item.id)}>
                {({ pressed }) => (
                  <FontAwesome
                    name="times"
                    size={30}
                    color={Colors[colorScheme ?? 'light'].error}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Styled.listItemIconViewInnerItem>
          </Styled.listItemIconViewInner>
          {item.active ?
            <Styled.listItemIconViewInnerPrice>
              <Styled.TextQTD text={Colors[colorScheme ?? 'light'].text}>
                QTD: {item.quantity}
              </Styled.TextQTD >
              <Styled.TextValue text={Colors[colorScheme ?? 'light'].text}>
                R$ {item.amount} {item.unit}
              </Styled.TextValue >
              <Styled.TextValueTotal text={Colors[colorScheme ?? 'light'].text}>
                Total: R$ {Number(item.amount! * item.quantity!).toFixed(2)}
              </Styled.TextValueTotal>
            </Styled.listItemIconViewInnerPrice>
            : <></>}

        </Styled.listItemIconView>
      </Styled.listItem >
    ))
  }


  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      {createList(items)}
    </Styled.Container>
  );
}

