
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useTextureLoader(
  onTextureLoaded: (texture: THREE.Texture) => void
) {
  const textureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    // Load window texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://shop.asher-group.com.ua/image/cache/catalog/Vikna/vikno-1200x750.png',
      (texture) => {
        textureRef.current = texture;
        onTextureLoaded(texture);
      },
      // onProgress callback (optional)
      undefined,
      // onError callback
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    return () => {
      // Clean up texture if needed
      textureRef.current = null;
    };
  }, [onTextureLoaded]);

  return textureRef;
}
