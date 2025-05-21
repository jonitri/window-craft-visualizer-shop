
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
          // Apply texture settings for better appearance
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          texture.needsUpdate = true;
          
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
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, [onTextureLoaded]);

  // If the texture can't be loaded, we'll use a basic texture
  useEffect(() => {
    if (hasError) {
      console.log("Creating basic texture after failure");
      // Create a simple canvas texture as fallback
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      if (context) {
        // Create a more detailed fallback texture
        // Background gradient
        const gradient = context.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#e0e8f0');
        gradient.addColorStop(1, '#c0d0e0');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 512, 512);
        
        // Window frame
        context.strokeStyle = 'rgba(80, 80, 80, 0.7)';
        context.lineWidth = 40;
        context.strokeRect(50, 50, 412, 412);
        
        // Glass panel effect
        context.fillStyle = 'rgba(200, 220, 240, 0.7)';
        context.fillRect(70, 70, 372, 372);
        
        // Add reflections
        context.fillStyle = 'rgba(255, 255, 255, 0.4)';
        context.beginPath();
        context.moveTo(70, 70);
        context.lineTo(170, 70);
        context.lineTo(70, 170);
        context.closePath();
        context.fill();
        
        // Add some text
        context.font = '40px Arial';
        context.fillStyle = 'rgba(0, 0, 0, 0.6)';
        context.textAlign = 'center';
        context.fillText('Window', 256, 256);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
      
      textureRef.current = texture;
      onTextureLoaded(texture);
    }
  }, [hasError, onTextureLoaded]);

  return textureRef;
}
