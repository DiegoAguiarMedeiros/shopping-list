import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';
import { itemInterface } from '../../../../types/types';
import { useEffect, useState } from 'react';

interface itemProps {
  totalAmount: String,
  totalActive: String,
  totalItems: String,
}



export default function TotalBar({ totalAmount,totalActive,totalItems }: itemProps) {

  const colorScheme = useColorScheme();




  return (
    <Styled.listItem
      border={Colors[colorScheme ?? 'light'].border}
      background={Colors[colorScheme ?? 'light'].backgroundLighter}
    >
      <Styled.TotalView>
        <Styled.Text text={Colors[colorScheme ?? 'light'].text}>
          Itens {totalActive}/{totalItems}
        </Styled.Text>
      </Styled.TotalView>
      <Styled.TotalPriceView>
        <Styled.Text text={Colors[colorScheme ?? 'light'].text}>
          total: R${totalAmount}
        </Styled.Text>
      </Styled.TotalPriceView>
    </Styled.listItem>
  );
}

