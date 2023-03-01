import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';

interface itemProps {
  items: string[];
}



export default function TotalBar({ items }: itemProps) {
  const colorScheme = useColorScheme();

  return (
    <Styled.listItem 
    border={Colors[colorScheme ?? 'light'].border} 
    background={Colors[colorScheme ?? 'light'].backgroundLighter} 
    >
      <Styled.TotalView>
        <Styled.Text text={Colors[colorScheme ?? 'light'].text}>
          Itens 0/10
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

