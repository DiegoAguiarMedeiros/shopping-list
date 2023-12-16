import * as Styled from "./styles";

interface GridItemInnerProps {
    background?: string;
    borderColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    height?: number;
}

export const GridItemInner = ({ background, borderColor, underlayColor, children, height }: GridItemInnerProps) => {
    return (<Styled.Item
        background={background ?? "transparent"}
        borderColor={borderColor ?? "transparent"}
        underlayColor={underlayColor ?? "transparent"}
        height={`${height}px`}
    >{children}</Styled.Item>)
}
interface GridItemWrapperProps {
    children: React.ReactNode;
    width: number;
    height?: number;
}

export const GridItemWrapper = ({ children, width, height }: GridItemWrapperProps) => {
    return (<Styled.Wrapper
        width={`${width}%`}
        height={`${height}px`}
    >{children}</Styled.Wrapper>)
}

interface GridItemWrapperInnerProps {
    children: React.ReactNode;
    height?: number;
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
}


export const GridItemWrapperInner = ({ children, height, justify }: GridItemWrapperInnerProps) => {
    return (
        <Styled.WrapperInner height={`${height}%`} justify={justify ?? "center"}>
            {children}
        </Styled.WrapperInner>)
}
