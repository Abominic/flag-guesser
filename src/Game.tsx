import { useState } from "react";
import styled from "styled-components";
import MainMenu from "./MainMenu";
import Quiz, { QuizUserAnswer } from "./Quiz";
import Results from "./Results";

interface GameStateInfo {
  diff?: number,
  results?: QuizUserAnswer[]
}

const ERRORMSG = (<h2 style={{color: "red"}}>An error occurred.</h2>);

export default function Game() {
  let [gameState, setGameState] = useState({mode: "setup", stateInfo: {} as GameStateInfo});

  let display;
  switch (gameState.mode) {
    case "setup":
      display = (<MainMenu startGame={(diff)=>{setGameState({mode: "playing", stateInfo: {diff}})}}></MainMenu>);
      break;
    case "playing":
      let diff: number;
      if (typeof gameState.stateInfo.diff === "undefined") {
        console.error("Difficulty setting not found!");
        diff = 0;
      } else {
        diff = gameState.stateInfo.diff;
      }
      display = (<Quiz difficulty={diff} quizResults={res=>setGameState({mode: "results", stateInfo:{results: res}})}></Quiz>);
      break;
    case "results":
      if (gameState.stateInfo.results) { 
        display = <Results answers={gameState.stateInfo.results} returnToMenu={()=>{setGameState({mode: "setup", stateInfo: {}})}}></Results>;
      } else {
        display = ERRORMSG;
      }
      break;
    default:
      display = ERRORMSG;
  }
  return (
    <div>
      {display}
    </div>
  )
}

