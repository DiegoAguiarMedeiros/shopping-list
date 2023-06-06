import { useColorScheme } from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';
import { lazy, useState } from 'react';
import { BottomSheetProps } from '../../../types/types';
const Button = lazy(() => import('../../../components/Button'));
const BottomSheetComponent = lazy(() => import('../../../components/BottomSheetComponent'));

interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../../assets/images/emptyList.png'),
};

export default function EmptyList() {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    action: 'addList',
    buttonText: 'add',
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.ContainerListEmpty >
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
          <Styled.ListEmptyTextmessage text={Colors[colorScheme ?? 'light'].text2}>
            Você não tem nenhuma lista criada
          </Styled.ListEmptyTextmessage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInnerButton>
          <Styled.ContainerButtonAdd>
            <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} icon="plus" onPress={() => setBottomSheetProps({ ...bottomSheetProps, isVisible: true })} />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInnerButton>
      </Styled.ContainerListEmpty>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container >
  );
}

