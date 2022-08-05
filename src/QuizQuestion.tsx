import { useState } from "react";
import styled from "styled-components";
import { Country } from "./countries";
import { Question } from "./Quiz";
import { Button } from "./styles";

interface QuizQuestionProps {
  question: Question,
  onSubmit: (country: Country)=>void
}

const FlagImage = styled.img`
  width: 25vw;
`;

const AnswerContainer = styled.div`
  display: inline-flex;
  max-width: 25vw;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
`;

export default function QuizQuestion(props: QuizQuestionProps) {
  let answers = props.question.answers;
  let code = answers[props.question.correctIndex].code.toLowerCase();

  let [imageLoaded, setImageLoaded] = useState(false);
  
  let answerButtons = [];
  for (let answer of answers){
    answerButtons.push(<Button key={answer.code} onClick={()=>{props.onSubmit(answer)}}>{answer.name}</Button>);
  }

  let placeholder = imageLoaded?null:(<p>Loading Image...</p>);

  return (
    <div>
      <h2>Which flag is this?</h2>
      <FlagImage src={"/flags/" + code + ".svg"} onLoad={()=>{setImageLoaded(true)}}/>
      {placeholder}
      <br/>
      <AnswerContainer>
        {answerButtons}
      </AnswerContainer>
      
    </div>
  );
}