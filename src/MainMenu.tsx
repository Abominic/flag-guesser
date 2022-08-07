import Select from "./Select";
import { useState } from "react";
import { Button } from "./styles";
import styled from "styled-components";

interface MainMenuProps {
  startGame: (difficulty: number) => void
}

const Link = styled.a`
  color: #555;
`;

export default function MainMenu(props: MainMenuProps) {
  let [difficulty, setDifficulty] = useState(0);

  let difficultyDetails:JSX.Element = <br/>;
  switch (difficulty) {
    case 0: //
      difficultyDetails = (
        <ul>
          <li>Choose between 4 countries provided</li>
          <li>Only top 150 GDP countries</li>
        </ul>
      )
      break;
    case 1:
      difficultyDetails = (
        <ul>
          <li>Choose between 8 countries, territories, and unions</li>
          <li>All countries and their territories</li>
        </ul>
      );
      break;
    case 2:
      difficultyDetails = (
        <ul>
          <li>Text input (more than 200 options)</li>
          <li>All countries and their territories</li>
        </ul>
      );
      break;
  }

  return (
    <div className="menu">
      <p>
        Guess the name of the flag provided to score points
      </p>
      <p>
        Select difficulty
      </p>
      <Select buttonLabels={["Easy", "Medium", "Hard"]} selected={difficulty} onSelectChange={setDifficulty}></Select>
      <br/>
      {difficultyDetails}
      <br/>
      <Button primary onClick={()=>{props.startGame(difficulty)}}>Start</Button>
      <br/><br/><br/>
      <Link href="https://github.com/lipis/flag-icons" target="_blank">SVG Flags stolen from: https://github.com/lipis/flag-icons</Link>
    </div>
  )
}