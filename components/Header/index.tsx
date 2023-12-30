import * as Styled from "./styles";


type HeaderProps = {
    background: string,
    left?: React.ReactNode,
    title: React.ReactNode,
    right?: React.ReactNode,
    bottom?: React.ReactNode,
}
export default function Header({ left, title, right, background, bottom }: Readonly<HeaderProps>) {
    return (<Styled.ContainerHeader bottom={!!bottom} background={background}>
        <Styled.ContainerHeaderTop>
            {left ? <Styled.ContainerHeaderLeft>
                {left}
            </Styled.ContainerHeaderLeft> : <></>}
            <Styled.ContainerHeaderTitle>
                {title}
            </Styled.ContainerHeaderTitle>
            {right ? <Styled.ContainerHeaderRight>
                {right}
            </Styled.ContainerHeaderRight> : <></>}
        </Styled.ContainerHeaderTop>
        {bottom ? <Styled.ContainerHeaderBottom>
            {bottom}
        </Styled.ContainerHeaderBottom> : <></>}
    </Styled.ContainerHeader>)
}