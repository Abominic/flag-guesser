import styled from 'styled-components';
import Game from './Game';

const AppContainer = styled.div`
  text-align: center;
`;

function App() {
  return (
    <AppContainer>
      <h1>Dom's Flag Guessing Game</h1>
      <Game></Game>
    </AppContainer>
  );
}

export default App;
