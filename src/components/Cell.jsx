import { useRef } from 'react';
import { Box } from '@react-three/drei';

const Cell = ({ position, color, onClick }) => {
  const mesh = useRef();

  return (
    <Box args={[1, 1, 1]} ref={mesh} position={position} onClick={onClick}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};

export default Cell;
