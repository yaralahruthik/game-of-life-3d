import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshWobbleMaterial } from '@react-three/drei';

const Cell = ({ position, color }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <Box args={[1, 1, 1]} ref={mesh} position={position}>
      <MeshWobbleMaterial color={color} speed={2} factor={0.6} />
    </Box>
  );
};

export default Cell;
