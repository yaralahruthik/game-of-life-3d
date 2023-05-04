import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cell from './Cell';

const Grid = ({ width, height, depth, rules }) => {
  const [grid, setGrid] = useState(() =>
    generateInitialGrid(width, height, depth),
  );

  const step = useCallback(() => {
    setGrid((prevGrid) => applyRules(prevGrid, width, height, depth, rules));
  }, [width, height, depth, rules]);

  useEffect(() => {
    const intervalId = setInterval(step, 100);
    return () => clearInterval(intervalId);
  }, [step]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        castShadow
      />
      <group>
        {grid.map((cell, index) => (
          <Cell
            key={index}
            position={indexToPosition(index, width, height, depth)}
            color={cell === 1 ? 'orange' : 'gray'}
          />
        ))}
      </group>
      <OrbitControls />
    </Canvas>
  );
};

const generateInitialGrid = (width, height, depth) => {
  const grid = new Array(width * height * depth).fill(0);
  return grid.map(() => (Math.random() > 0.5 ? 1 : 0));
};

const indexToPosition = (index, width, height, depth) => {
  const x = index % width;
  const y = Math.floor(index / (width * depth)) % height;
  const z = Math.floor(index / width) % depth;

  return [x - width / 2, y - height / 2, z - depth / 2];
};

const applyRules = (grid, width, height, depth, rules) => {
  const newGrid = [...grid];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let z = 0; z < depth; z++) {
        const index = x + width * (z + depth * y);
        const neighbors = countNeighbors(grid, x, y, z, width, height, depth);
        newGrid[index] = rules(grid[index], neighbors);
      }
    }
  }

  return newGrid;
};

const countNeighbors = (grid, x, y, z, width, height, depth) => {
  let count = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx !== 0 || dy !== 0 || dz !== 0) {
          const nx = (x + dx + width) % width;
          const ny = (y + dy + height) % height;
          const nz = (z + dz + depth) % depth;
          const index = nx + width * (nz + depth * ny);
          count += grid[index];
        }
      }
    }
  }

  return count;
};

export default Grid;
