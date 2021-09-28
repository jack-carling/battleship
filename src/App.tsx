import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import Game from './components/Game';
import { setID, setRoom, disconnect, setCurrentTurn, switchCurrentTurn } from './features/gameSlice';
import { setShips } from './features/enemyBoardSlice';
import { handleShot } from './features/boardSlice';

interface EventData {
  id?: string;
  initial?: boolean;
  ready?: boolean;
  disconnect?: boolean;
  currentTurn?: boolean;
  ships?: number[];
  shot?: boolean;
  index?: number;
  switch?: boolean;
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const SSE = new EventSource('/sse');
    SSE.onmessage = function (e: MessageEvent) {
      const data: EventData = JSON.parse(e.data);
      console.log(data);
      if (data.initial) {
        if (data.id) dispatch(setID(data.id));
      }
      if (data.ready) {
        if (data.id) dispatch(setRoom(data.id));
        if (data.currentTurn !== undefined) dispatch(setCurrentTurn(data.currentTurn));
        if (data.ships?.length) dispatch(setShips(data.ships));
      }
      if (data.disconnect) {
        dispatch(disconnect());
      }
      if (data.shot) {
        if (data.index !== undefined) dispatch(handleShot(data.index));
      }
      if (data.switch) {
        dispatch(switchCurrentTurn());
      }
    };
  }, [dispatch]);

  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
