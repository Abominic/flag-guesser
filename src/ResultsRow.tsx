import styled from "styled-components";
import { QuizUserAnswer } from "./Quiz";

interface ResultsRowProps {
  answer: QuizUserAnswer
}

const TableRow = styled.tr`
  background-color: ${(props: ResultsRowProps) => (props.answer.correct_answer.code === props.answer.user_answer.code)?"#272":"#722"};
`;

const SmallFlagImage = styled.img`
  display: inline;
  height: 1em;
  margin-left: 0.5em;
  vertical-align: middle;
`;

const TableCell = styled.td`
  padding: 0.5em;
`

export function ResultsRow(props: ResultsRowProps) {
  return (
    <TableRow answer={props.answer}>
      <TableCell>
        {props.answer.user_answer.name}
        <SmallFlagImage src={"flags/" + props.answer.user_answer.code + ".svg"}/>
      </TableCell>
      <TableCell>
        {props.answer.correct_answer.name}
        <SmallFlagImage src={"flags/" + props.answer.correct_answer.code + ".svg"}/>
      </TableCell>
    </TableRow>
  );
}

