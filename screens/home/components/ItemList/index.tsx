import { FontAwesome } from '@expo/vector-icons';
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { itemInterface } from '../../../../types/types';

interface itemProps {
  items: itemInterface[],
  removeFromList: (id: number) => void,
}



export default function ItemList({ items, removeFromList }: itemProps) {
  const colorScheme = useColorScheme();

  const remove = (id: number) => {
    removeFromList(id);
    console.log('saiu')
    return null
  }

  const createList = (items: itemInterface[]) => {
    return items.map((item, index) => (
      <Styled.listItem border={Colors[colorScheme ?? 'light'].border} key={`listItem_${index}`} background={Colors[colorScheme ?? 'light'].backgroundLighter}>
        <Styled.listItemIconText>
          <Styled.titleList text={Colors[colorScheme ?? 'light'].text}>
            {item.item}
          </Styled.titleList >
        </Styled.listItemIconText>
        <Styled.listItemIconOk>
          <Styled.Text>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="check"
                  size={30}
                  color={Colors[colorScheme ?? 'light'].success}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Styled.Text>
        </Styled.listItemIconOk>
        <Styled.listItemIconNotOk>
          <Styled.Text>
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
          </Styled.Text>
        </Styled.listItemIconNotOk>
      </Styled.listItem>
    ))
  }


  return (
    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      {createList(items)}
    </Styled.Container>
  );
}

