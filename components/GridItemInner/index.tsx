import * as Styled from "./styles";

interface GridItemInnerProps {
    background?: string;
    borderColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    height?: number;
    row: boolean;
    onPress?: () => void;
}

export const GridItemInner = ({ background, borderColor, underlayColor, children, height, row, onPress }: GridItemInnerProps) => {
    return (<Styled.Item
        background={background ?? "transparent"}
        borderColor={borderColor ?? "transparent"}
        underlayColor={underlayColor ?? "transparent"}
        height={`${height}px`}
        row={row}
        onPress={onPress}
    >{children}</Styled.Item>)
}
interface GridItemWrapperRowProps {
    children: React.ReactNode;
    height?: number;
}
interface GridItemWrapperColProps {
    children: React.ReactNode;
    width: number;
    height?: number;
}

export const GridItemWrapperRow = ({ children, height }: GridItemWrapperRowProps) => {
    return (<Styled.WrapperRow
        height={`${height}px`}
    >{children}</Styled.WrapperRow>)
}
export const GridItemWrapperCol = ({ children, width, height }: GridItemWrapperColProps) => {
    return (<Styled.WrapperCol
        width={`${width}%`}
        height={`${height}px`}
    >{children}</Styled.WrapperCol>)
}

interface GridItemWrapperInnerProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
}


export const GridItemWrapperInner = ({ children, width, height, justify }: GridItemWrapperInnerProps) => {
    return (
        <Styled.WrapperInner width={width ? `${width}%` : "100%"} height={`${height}%`} justify={justify ?? "center"}>
            {children}
        </Styled.WrapperInner>)
}
