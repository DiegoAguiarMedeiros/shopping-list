import styled from 'styled-components/native';

export const Title = styled.Text<{
  color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 20px;
`;
export const SubTitle = styled.Text<{
  color: string,
  align: string,
}>`
  color:${(props: { color: string; }) => props.color};
  text-align:${(props: { align: string; }) => props.align};
  font-size: 16px;
  width: 100%;
`;
export const Text = styled.Text<{
  color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 14px;
`;