import styled, { css } from "styled-components/native";

export const Button = styled.TouchableHighlight<{
  border: string;
  background: string;
  height?: string;
  radius?: boolean;
}>`
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.border};

  border-top-right-radius: 10px;
  border-top-left-radius: ${(props) =>
    props.radius ? "10px" : "0px"};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: ${(props) =>
    props.radius ? "10px" : "0px"};

  padding: 5px 10px;
  height: ${(props) => props.height || "35px"};
  min-height: 35px;
  min-width: 80px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  font-size: 16px;
  margin: auto;
  padding: 5px 10px;
`;
