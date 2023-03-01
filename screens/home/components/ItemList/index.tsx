import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';

interface itemProps {
  items: string[];
}



export default function ItemList({ items }: itemProps) {
  const colorScheme = useColorScheme();

  const createList = (items: String[]) => {
    return items.map((item,index) => (
      <Styled.listItem border={Colors[colorScheme ?? 'light'].border} key={`listItem_${index}`} background={Colors[colorScheme ?? 'light'].backgroundLighter}>
        <Styled.listItemIconText>
          <Styled.titleList text={Colors[colorScheme ?? 'light'].text}>
            {item}
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
            <Pressable>
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

