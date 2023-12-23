import * as Styled from "./styles";


type HeaderProps = {
    background: string,
    left?: React.ReactNode,
    title: React.ReactNode,
    right?: React.ReactNode,
}
export default function Header({ left, title, right, background }: Readonly<HeaderProps>) {
    return (<Styled.ContainerHeader background={background}>
        {left ? <Styled.ContainerHeaderLeft>
            {left}
        </Styled.ContainerHeaderLeft> : <></>}
        <Styled.ContainerHeaderTitle>
            {title}
        </Styled.ContainerHeaderTitle>
        {right ? <Styled.ContainerHeaderRight>
            {right}
        </Styled.ContainerHeaderRight> : <></>}
    </Styled.ContainerHeader>)
}