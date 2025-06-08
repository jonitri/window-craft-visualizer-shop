
import { useEffect } from 'react';
import * as THREE from 'three';

interface UseThreeJSResizeProps {
  mountRef: React.RefObject<HTMLDivElement>;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
}

export const useThreeJSResize = ({
  mountRef,
  camera,
  renderer
}: UseThreeJSResizeProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mountRef, camera, renderer]);
};
