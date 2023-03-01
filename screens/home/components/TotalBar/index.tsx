import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { itemInterface } from '../../../../types/types';
import { useEffect, useState } from 'react';

interface itemProps {
  items: itemInterface[];
}



export default function TotalBar({ items }: itemProps) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const colorScheme = useColorScheme();

  const activeItems = () => {
    const active = items.filter((item) => item.active)
    setItemQuantity(active.length)
  }

  useEffect(() => {
    activeItems()
  }, [items.length]);


  return (
    <Styled.listItem
      border={Colors[colorScheme ?? 'light'].border}
      background={Colors[colorScheme ?? 'light'].backgroundLighter}
    >
      <Styled.TotalView>
        <Styled.Text text={Colors[colorScheme ?? 'light'].text}>
          Itens {itemQuantity}/{items.length}
        </Styled.Text>
      </Styled.TotalView>
      <Styled.TotalPriceView>
        <Styled.Text text={Colors[colorScheme ?? 'light'].text}>
          total: $0,00
        </Styled.Text>
      </Styled.TotalPriceView>
    </Styled.listItem>
  );
}

