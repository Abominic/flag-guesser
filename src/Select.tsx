import styled from "styled-components";
import {Button} from "./styles";

interface SelectProps {
  buttonLabels: string[],
  selected: number
  onSelectChange: (newValue: number)=>void
}

interface SelectButtonProps {
  selected: boolean
}

const SelectButton = styled(Button)`
  background-color: ${(props: SelectButtonProps) => props.selected?"white":"#222"};
  color: ${(props: SelectButtonProps) => props.selected?"#222":"white"};
  transition: color 0.5s, background-color 0.5s;
`

export default function Select(props: SelectProps) {
  let buttons = [];

  for (let i = 0; i < props.buttonLabels.length; i++) {
    buttons.push(
      <SelectButton key={i} onClick={()=>{props.onSelectChange(i)}} selected={i==props.selected}>{props.buttonLabels[i]}</SelectButton>
    );
  }

  return (
    <span className="multiSelect">
      {buttons}
    </span>
  )
}