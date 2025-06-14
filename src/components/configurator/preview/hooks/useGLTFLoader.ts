
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface UseGLTFLoaderProps {
  modelUrl: string;
  scene: THREE.Scene | null;
}

export const useGLTFLoader = ({ modelUrl, scene }: UseGLTFLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const loaderRef = useRef<GLTFLoader | null>(null);

  useEffect(() => {
    if (!scene || !modelUrl) return;

    console.log("Loading GLTF model from:", modelUrl);
    setIsLoading(true);
    setError(null);

    if (!loaderRef.current) {
      loaderRef.current = new GLTFLoader();
    }

    const loader = loaderRef.current;

    loader.load(
      modelUrl,
      (gltf) => {
        console.log("GLTF model loaded successfully", gltf);
        
        const loadedModel = gltf.scene;
        loadedModel.name = 'loaded-gltf-model';
        
        // Scale and position the model appropriately
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        
        // Scale to fit within our window space (approximately 2 units)
        const scale = 2 / maxDimension;
        loadedModel.scale.setScalar(scale);
        
        // Center the model
        const center = box.getCenter(new THREE.Vector3());
        loadedModel.position.sub(center.multiplyScalar(scale));
        
        // Add shadows
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(loadedModel);
        setModel(loadedModel);
        setIsLoading(false);
        
        console.log("GLTF model added to scene with scale:", scale);
      },
      (progress) => {
        console.log("Loading progress:", (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error("Error loading GLTF model:", error);
        setError(`Failed to load 3D model: ${error.message}`);
        setIsLoading(false);
      }
    );

    return () => {
      if (model && scene) {
        scene.remove(model);
        setModel(null);
      }
    };
  }, [modelUrl, scene]);

  return { model, isLoading, error };
};
