import { useState } from 'react';
import styled from 'styled-components';
import Game from './Game';

const AppContainer = styled.div`
  text-align: center;
`;

const HeaderLink = styled.a`
  color: white;
  text-decoration: none;
`;

function App() {
  let [resetKey, setResetKey] = useState(0); //Used for updating the key of the game to tell react it is ia different element so the state gets wiped.

  return (
    <AppContainer>
      <h1><HeaderLink href="#" onClick={()=>setResetKey(resetKey+1)}>Dom's Flag Guessing Game</HeaderLink></h1>
      <Game key={resetKey}></Game>
    </AppContainer>
  );
}

export default App;
