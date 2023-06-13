import { useThree } from "@react-three/fiber";
import { OrbitControls, OrbitControlsProps } from "@react-three/drei";

const CustomOrbitControls = () => {
  const { camera, gl } = useThree();

  const orbitControlsProps: OrbitControlsProps = {
    enableRotate: true,
    enablePan: false,
    enableZoom: false,
    rotateSpeed: 0.5,
    maxPolarAngle: Math.PI / 2, // Restrict vertical rotation
    minPolarAngle: Math.PI / 2, // Restrict vertical rotation
    args: [camera, gl.domElement],
  };

  return <OrbitControls {...orbitControlsProps} />;
};

export default CustomOrbitControls;
