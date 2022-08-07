import { useState } from "react";
import { Country, genCountry, genCountryEasy } from "./countries";
import QuizQuestion from "./QuizQuestion";

const NUMBER_OF_QUESTIONS = 10;

interface QuizProps {
  difficulty: number
  quizResults: (results: QuizUserAnswer[])=>void
}

export interface QuizUserAnswer {
  correct_answer: Country,
  user_answer: Country,
}

export default function Quiz(props: QuizProps) {
  let answersPerQuestion: number;
  switch (props.difficulty) {
    case 1: //Medium
      answersPerQuestion = 8;
      break;
    case 2: //Hard
      answersPerQuestion = 1; //Only the right answer is needed.
      break;
    default: //Easy by default
      answersPerQuestion = 4;
  }

  let [quiz, _setQuiz] = useState(generateQuiz(NUMBER_OF_QUESTIONS, answersPerQuestion, props.difficulty===0));
  let [currentQ, setCurrentQ] = useState(0);
  let [selectedAnswers, setSelectedAnswers] = useState(Array(NUMBER_OF_QUESTIONS).fill(null));

  let questionSubmit = (index: number, country: Country)=>{ //Immutably copy array and update.
    let answer: QuizUserAnswer = {
      correct_answer: quiz[index].answers[quiz[index].correctIndex],
      user_answer: country
    }
    let newSelected = [];
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (i === index) {
        newSelected.push(answer);
      } else {
        newSelected.push(selectedAnswers[i]);
      }
    }
    let nextQ = currentQ+1;

    if (nextQ === quiz.length) { //Quiz finished
      props.quizResults(newSelected);
    } else { //Continue quiz
      setCurrentQ(nextQ);
      setSelectedAnswers(newSelected);
    }
  }

  let questionElements: JSX.Element[] = [];
  for (let i = 0; i < quiz.length; i++) {
    let q = quiz[i];
    questionElements.push(<QuizQuestion textEntry={props.difficulty===2} question={q} key={i} onSubmit={country=>{questionSubmit(i, country)}}></QuizQuestion>);
  };

  return (
    <div className="quiz">
      <p>{currentQ + 1}/{quiz.length}</p>
      {questionElements[currentQ]}
    </div>
  )
}

export interface Question {
  answers: Country[],
  correctIndex: number
}

export function generateQuiz(numQuestions: number, numAnswersPerQ: number, easyMode: boolean) {
  let qs: Question[] = [];
  for (let i = 0; i < numQuestions; i++) {
    let question: Question;
    do {
      let answers: Country[] = [];
      for (let j = 0; j < numAnswersPerQ; j++) {
        let country: Country;
        do {
          country = easyMode?genCountryEasy():genCountry();
        } while (answers.find(c=>{
          return c === country;
        }))
        answers.push(country);
      }

      let correctIndex = Math.floor(Math.random() * numAnswersPerQ);
      question = {
        answers,
        correctIndex
      };
    } while (qs.find(q=>{
      return q.answers[q.correctIndex] === question.answers[question.correctIndex];
    }))
    qs.push(question);
  }
  return qs;
}



