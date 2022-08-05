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
  return (
    <div className="menu">
      <p>
        Select difficulty.
      </p>
      <Select buttonLabels={["Easy", "Medium", "Hard"]} selected={difficulty} onSelectChange={setDifficulty}></Select>
      <br></br>
      <Button onClick={()=>{props.startGame(difficulty)}}>Start</Button>
      <br/><br/><br/>
      <Link href="https://github.com/lipis/flag-icons" target="_blank">SVG Flags stolen from: https://github.com/lipis/flag-icons</Link>
    </div>
  )
}