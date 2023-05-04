const Controls = ({ onStart, onPause, onReset }) => {
  return (
    <div className="mt-4 flex justify-center space-x-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={onStart}
      >
        Start
      </button>
      <button
        className="rounded bg-yellow-500 px-4 py-2 text-white"
        onClick={onPause}
      >
        Pause
      </button>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Controls;
