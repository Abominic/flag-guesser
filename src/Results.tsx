import styled from "styled-components";
import { countryEquals } from "./countries";
import { QuizUserAnswer } from "./Quiz";
import { ResultsRow } from "./ResultsRow";
import { Button } from "./styles";

interface ResultsProps {
  answers: QuizUserAnswer[],
  returnToMenu: ()=>void
}

const ResultsTable = styled.table`
  display: inline;
`;


export default function Results(props: ResultsProps) {
  let score = 0;
  let rows: JSX.Element[] = [];
  for (let ans of props.answers) {
    rows.push(<ResultsRow key={ans.correct_answer.code} answer={ans}></ResultsRow>);

    score += countryEquals(ans.correct_answer, ans.user_answer)?1:0;
  }
  
  return (
    <div>
      <p>You Scored: {score}/{props.answers.length}</p>
      <ResultsTable>
        <th>Your Answer</th><th>Correct Answer</th>
        {rows}
      </ResultsTable>
      <br/>
      <Button onClick={props.returnToMenu}>Return To Menu</Button>
    </div>
  );
}