import { useEffect } from 'react';
import Game from './components/Game';

function App() {
  useEffect(() => {
    const SSE = new EventSource('/sse');
    console.log(SSE);

    SSE.onmessage = function (e: MessageEvent) {
      console.log('SSE:', e.data);
    };
  }, []);

  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
