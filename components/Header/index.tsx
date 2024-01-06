import * as Styled from "./styles";


type HeaderProps = {
    background: string,
    bottom?: React.ReactNode,
}
export default function Header({ background, bottom }: Readonly<HeaderProps>) {
    return (<Styled.ContainerHeader bottom={!!bottom} background={background}>
        {bottom ? <Styled.ContainerHeaderBottom>
            {bottom}
        </Styled.ContainerHeaderBottom> : <></>}
    </Styled.ContainerHeader>)
}