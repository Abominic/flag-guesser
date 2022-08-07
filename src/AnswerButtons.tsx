import styled from "styled-components";
import { Country } from "./countries";
import { Button } from "./styles";

interface AnswerButtonsProps {
  countries: Country[] //should make it more agnostic or whatever but oh well.
  onSubmit: (country: Country) => void,
  emphasiseFirst?: boolean
}

const AnswerButtonContainer = styled.ol`
  display: inline;
  list-style-type: none;
`;

const AnswerButton = styled(Button)`
  width: 15vw;
  @media (max-width: 768px) {
    width: 30vw;
  }
`;

export default function AnswerButtons(props: AnswerButtonsProps) {

  let buttons: JSX.Element[] = [];
  for (let i = 0; i < props.countries.length; i++) {
    let c = props.countries[i];
    buttons.push(<li key={c.code}><AnswerButton primary={i===0 && props.emphasiseFirst /* Make the first button green if need be.*/} onClick={()=>{props.onSubmit(c)}}>{c.name}</AnswerButton></li>);
  };

  return (
    <AnswerButtonContainer>
      {buttons}
    </AnswerButtonContainer>
  )
}
