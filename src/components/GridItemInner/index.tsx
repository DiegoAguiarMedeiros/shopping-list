import * as Styled from "./styles";


type alignType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";


interface GridItemInnerProps {
    background?: string;
    borderColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    height?: number;
    row?: boolean;
    noMargin?: boolean;
    noPadding?: boolean;
    onPress?: () => void;
    elevation?: boolean;
}

export const GridItemInner = ({ background, borderColor, underlayColor, children, height, row, noPadding, noMargin, onPress, elevation }: GridItemInnerProps) => {
    return (<Styled.Item
        elevation={elevation ? 3 : 0}
        background={background ?? "transparent"}
        borderColor={borderColor ?? "transparent"}
        underlayColor={underlayColor ?? "transparent"}
        height={`${height}px`}
        row={row ?? false}
        noPadding={noPadding ?? false}
        noMargin={noMargin ?? false}
        onPress={onPress}
    >{children}</Styled.Item>)
}
interface GridItemWrapperRowProps {
    children: React.ReactNode;
    height?: number;
    maxHeight?: number;
    justify?: alignType;
}
interface GridItemWrapperColProps {
    children: React.ReactNode;
    width: number;
    height?: number;
    justify?: alignType;
}

export const GridItemWrapperRow = ({ children, height, maxHeight, justify }: GridItemWrapperRowProps) => {
    return (<Styled.WrapperRow
        height={height ? `${height}%` : "100%"}
        maxHeight={maxHeight ? `${maxHeight}px` : "100%"}
        justify={justify ?? "center"}
    >{children}</Styled.WrapperRow>)
}
export const GridItemWrapperCol = ({ children, width, height, justify }: GridItemWrapperColProps) => {
    return (<Styled.WrapperCol
        width={`${width}%`}
        height={height ? `${height}%` : "100%"}
        justify={justify ?? "center"}
    >{children}</Styled.WrapperCol>)
}

interface GridItemWrapperInnerProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    justify?: alignType;
    align?: alignType;
}


export const GridItemWrapperInner = ({ children, width, height, justify, align }: GridItemWrapperInnerProps) => {
    return (
        <Styled.WrapperInner
            width={width ? `${width}%` : "100%"}
            height={height ? `${height}%` : "100%"}
            justify={justify ?? "center"}
            align={align ?? "center"}
        >
            {children}
        </Styled.WrapperInner>)
}
