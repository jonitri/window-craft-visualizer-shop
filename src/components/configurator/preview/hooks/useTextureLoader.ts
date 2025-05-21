
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function useTextureLoader(
  onTextureLoaded: (texture: THREE.Texture) => void
) {
  const textureRef = useRef<THREE.Texture | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load window texture
    const textureLoader = new THREE.TextureLoader();
    
    // Try to load the texture from a different source if the original fails
    const loadTexture = (url: string) => {
      console.log("Attempting to load texture from:", url);
      textureLoader.load(
        url,
        (texture) => {
          console.log("Texture loaded successfully");
          textureRef.current = texture;
          onTextureLoaded(texture);
          setHasError(false);
        },
        // onProgress callback (optional)
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // onError callback
        (error) => {
          console.error('Error loading texture:', error);
          setHasError(true);
          
          // If it's the first URL that failed, try the fallback
          if (url === 'https://shop.asher-group.com.ua/image/cache/catalog/Vikna/vikno-1200x750.png') {
            console.log("Trying fallback texture...");
            loadTexture('/placeholder.svg');  // Using the placeholder from public folder
          }
        }
      );
    };

    // Start with the original URL
    loadTexture('https://shop.asher-group.com.ua/image/cache/catalog/Vikna/vikno-1200x750.png');

    return () => {
      // Clean up texture if needed
      textureRef.current = null;
    };
  }, [onTextureLoaded]);

  // If the texture can't be loaded, we'll use a basic texture
  useEffect(() => {
    if (hasError) {
      console.log("Creating basic texture after failure");
      // Create a simple canvas texture as fallback
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, 256, 256);
        context.strokeStyle = 'gray';
        context.strokeRect(10, 10, 236, 236);
        context.font = '20px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText('Window', 128, 128);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      textureRef.current = texture;
      onTextureLoaded(texture);
    }
  }, [hasError, onTextureLoaded]);

  return textureRef;
}
