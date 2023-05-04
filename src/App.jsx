import { useState } from 'react';

import Grid from './components/Grid';
import Controls from './components/Controls';

const rules = (currentState, neighbors) => {
  if (currentState === 1 && (neighbors < 2 || neighbors > 3)) {
    return 0;
  }
  if (currentState === 0 && neighbors === 3) {
    return 1;
  }
  return currentState;
};

const App = () => {
  const [running, setRunning] = useState(false);

  const onStart = () => {
    setRunning(true);
  };

  const onPause = () => {
    setRunning(false);
  };

  return (
    <div className="h-full">
      <h1 className="py-4 text-center text-4xl">3D Game of Life</h1>
      <div className="h-1/2">
        <Grid
          width={10}
          height={10}
          depth={10}
          rules={rules}
          running={running}
        />
      </div>
      <Controls onStart={onStart} onPause={onPause} />
    </div>
  );
};

export default App;
