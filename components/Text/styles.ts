import styled from 'styled-components/native';

export const Title = styled.Text<{
  color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 20px;
`;
export const SubTitle = styled.Text<{
  color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 16px;
`;
export const Text = styled.Text<{
  color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 14px;
`;