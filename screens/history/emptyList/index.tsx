import { useColorScheme } from 'react-native';
import Colors from '../../../constants/Colors';
import * as Styled from './styles';

interface Image {
  image: any;
}

const img: Image =
{
  image: require('../../../assets/images/emptyList.png'),
};

export default function EmptyList() {
  const colorScheme = useColorScheme();

  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].bodyBackgroundColor}>
      <Styled.ContainerListEmpty >
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
          <Styled.ListEmptyTextmessage text={Colors[colorScheme ?? 'light'].bodyTextColor}>
            Você não tem nenhuma lista arquivada
          </Styled.ListEmptyTextmessage>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>
    </Styled.Container >
  );
}

