import { useState } from "react";
import styled from "styled-components";
import AnswerButtons from "./AnswerButtons";
import { Country } from "./countries";
import { Question } from "./Quiz";
import TextInput from "./TextInput";

interface QuizQuestionProps {
  question: Question,
  onSubmit: (country: Country)=>void,
  textEntry?: boolean
}

const FlagImage = styled.img`
  width: 15vw;
  @media (max-width: 768px) {
    width: 30vw;
  }
`;

export default function QuizQuestion(props: QuizQuestionProps) {
  let answers = props.question.answers;
  let code = answers[props.question.correctIndex].code.toLowerCase();

  let [imageLoaded, setImageLoaded] = useState(false);

  

  let answerContainer: JSX.Element;

  if (props.textEntry) {
    answerContainer = (
      <TextInput onSubmit={props.onSubmit}></TextInput>
    );
  } else {
    answerContainer = (
      <AnswerButtons countries={props.question.answers} onSubmit={props.onSubmit}/>
    );
  }

  let placeholder = imageLoaded?null:(<p>Loading Image...</p>);

  return (
    <div>
      <h2>Which flag is this?</h2>
      <FlagImage src={"flags/" + code + ".svg"} onLoad={()=>{setImageLoaded(true)}}/>
      {placeholder}
      <br/>
      {answerContainer}
    </div>
  );
}