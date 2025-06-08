
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface UseThreeJSAnimationProps {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  windowModel: THREE.Group | null;
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
}

export const useThreeJSAnimation = ({
  scene,
  camera,
  renderer,
  windowModel,
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating
}: UseThreeJSAnimationProps) => {
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!scene || !camera || !renderer) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (windowModel) {
        windowModel.rotation.x = THREE.MathUtils.degToRad(rotationX);
        
        if (isAutoRotating) {
          windowModel.rotation.y += 0.01;
        } else {
          windowModel.rotation.y = THREE.MathUtils.degToRad(rotationY);
        }

        if (viewMode === 'back') {
          windowModel.rotation.y += Math.PI;
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scene, camera, renderer, windowModel, rotationX, rotationY, isAutoRotating, viewMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
};
