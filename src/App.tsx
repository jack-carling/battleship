import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import Game from './components/Game';
import { setID, setRoom, disconnect } from './features/gameSlice';

interface EventData {
  id?: string;
  initial?: boolean;
  ready?: boolean;
  disconnect?: boolean;
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
      }
      if (data.disconnect) {
        dispatch(disconnect());
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
