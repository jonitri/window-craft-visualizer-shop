
import { useEffect, useRef, MutableRefObject } from 'react';
import * as THREE from 'three';
import { ThreeJsSceneRefs } from './useThreeJsScene';

interface AnimationProps {
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
  sceneRefs: ThreeJsSceneRefs;
  windowModelRef: MutableRefObject<THREE.Group | null>;
}

export function useWindowAnimation({
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating,
  sceneRefs,
  windowModelRef
}: AnimationProps): void {
  const prevRotationRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!sceneRefs.scene.current || !sceneRefs.camera.current || 
        !sceneRefs.renderer.current || !windowModelRef.current) {
      return;
    }
    
    const animate = () => {
      if (!sceneRefs.scene.current || !sceneRefs.camera.current || 
          !sceneRefs.renderer.current || !windowModelRef.current) {
        sceneRefs.animationFrame.current = requestAnimationFrame(animate);
        return;
      }

      // Apply user-controlled rotation
      windowModelRef.current.rotation.x = THREE.MathUtils.degToRad(rotationX);
      
      // Handle auto rotation or manual rotation
      if (isAutoRotating) {
        windowModelRef.current.rotation.y += 0.01;
      } else {
        windowModelRef.current.rotation.y = THREE.MathUtils.degToRad(rotationY);
      }
      
      // Handle view mode (front/back)
      if (viewMode === 'back' && prevRotationRef.current.y !== rotationY) {
        windowModelRef.current.rotation.y += Math.PI;
      }
      
      prevRotationRef.current = { x: rotationX, y: rotationY };

      sceneRefs.renderer.current.render(
        sceneRefs.scene.current, 
        sceneRefs.camera.current
      );
      sceneRefs.animationFrame.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (sceneRefs.animationFrame.current) {
        cancelAnimationFrame(sceneRefs.animationFrame.current);
      }
    };
  }, [rotationX, rotationY, isAutoRotating, viewMode, windowModelRef, sceneRefs]);
}
