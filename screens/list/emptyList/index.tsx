import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import { BottomSheetProps } from '../../../types/types';
import BottomSheetComponent from '../../../components/BottomSheetComponent';


interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../../assets/images/emptyList.png'),
};


interface listProps {
  list: string,
}

export default function EmptyList({ list }: listProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: list,
    action: 'addListItem',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  const handleOpenList = () => {
    router.push({ pathname: "/modal", params: { listId: list } });
  }


  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListEmpty >
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInner>
          <Styled.ListEmptyTextmessage text={Colors[colorScheme ?? 'light'].text2}>
            Você não tem nenhuma item na lista
          </Styled.ListEmptyTextmessage>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' onPress={() => setBottomSheetProps({ ...bottomSheetProps, isVisible: true })} background={Colors[colorScheme ?? 'light'].buttonBackground} icon="plus" />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container>
  );
}

