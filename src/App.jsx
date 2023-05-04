import Grid from './components/Grid';
import Controls from './components/Controls';

const App = () => {
  const rules = (currentState, neighbors) => {
    if (currentState === 1 && (neighbors < 2 || neighbors > 3)) {
      return 0;
    }
    if (currentState === 0 && neighbors === 3) {
      return 1;
    }
    return currentState;
  };

  const handleStart = () => {
    console.log('Starting the game...');
  };

  const handlePause = () => {
    console.log('Pausing the game...');
  };

  const handleReset = () => {
    console.log('Resetting the game...');
  };

  return (
    <div className="h-full">
      <h1 className="py-4 text-center text-4xl">3D Game of Life</h1>
      <div className="h-1/2">
        <Grid width={10} height={10} depth={10} rules={rules} />
      </div>
      <Controls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
