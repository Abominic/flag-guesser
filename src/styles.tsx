import styled from "styled-components";

interface ButtonProps {
  primary?: boolean
}

export const Button = styled.button`
  border-radius: 5px;
  border: 2px solid ${(props: ButtonProps)=>props.primary?"#7f7":"white"};
  background-color: #222;
  color: ${(props: ButtonProps)=>props.primary?"#7f7":"white"};
  padding: 0.5em;
  margin: 0.25em;
  cursor: pointer;
  font-weight: bolder;
  word-wrap: normal;
`;
