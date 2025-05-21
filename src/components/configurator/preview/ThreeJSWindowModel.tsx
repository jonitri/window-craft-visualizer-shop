
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

interface ThreeJSWindowModelProps {
  width: number;
  height: number;
  rotationX: number;
  rotationY: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
}

export const ThreeJSWindowModel = ({
  width,
  height,
  rotationX,
  rotationY,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  viewMode,
  isAutoRotating
}: ThreeJSWindowModelProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const windowModelRef = useRef<THREE.Group | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const prevRotationRef = useRef({ x: 0, y: 0 });

  // Setup scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load window texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://shop.asher-group.com.ua/image/cache/catalog/Vikna/vikno-1200x750.png',
      (texture) => {
        textureRef.current = texture;
        
        // Create window model
        createWindowModel();
        
        // Start animation loop
        animate();
      },
      // onProgress callback (optional)
      undefined,
      // onError callback
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Cleanup
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      // Clear all references
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      windowModelRef.current = null;
      textureRef.current = null;
    };
  }, []);

  // Create window model function
  const createWindowModel = () => {
    if (!sceneRef.current || !textureRef.current) return;
    
    const windowGroup = new THREE.Group();
    
    const aspectRatio = width / height;
    const windowWidth = 2;
    const windowHeight = windowWidth / aspectRatio;
    
    // Front and back panels with the window texture
    const geometry = new THREE.PlaneGeometry(windowWidth, windowHeight);

    // Using material with the loaded texture
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: textureRef.current,
      side: THREE.FrontSide,
    });
    
    const backMaterial = new THREE.MeshStandardMaterial({
      map: textureRef.current,
      side: THREE.BackSide,
    });

    const frontPanel = new THREE.Mesh(geometry, frontMaterial);
    frontPanel.position.z = 0.01;
    windowGroup.add(frontPanel);
    
    const backPanel = new THREE.Mesh(geometry, backMaterial);
    backPanel.position.z = -0.01;
    backPanel.rotation.y = Math.PI;
    windowGroup.add(backPanel);
    
    // Frame
    const frameThickness = 0.1;
    const frameDepth = 0.1;
    
    // Convert color hex to THREE color
    const baseColor = new THREE.Color(baseColorObject.hex);
    const outsideColor = new THREE.Color(outsideColorObject.hex);
    const insideColor = new THREE.Color(insideColorObject.hex);

    // Top frame
    const topFrameGeometry = new THREE.BoxGeometry(windowWidth + frameThickness, frameThickness, frameDepth);
    const topFrameMaterial = new THREE.MeshStandardMaterial({ color: baseColor });
    const topFrame = new THREE.Mesh(topFrameGeometry, topFrameMaterial);
    topFrame.position.y = windowHeight/2 + frameThickness/2;
    windowGroup.add(topFrame);
    
    // Bottom frame
    const bottomFrame = new THREE.Mesh(topFrameGeometry, topFrameMaterial);
    bottomFrame.position.y = -windowHeight/2 - frameThickness/2;
    windowGroup.add(bottomFrame);
    
    // Left frame
    const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, windowHeight + frameThickness * 2, frameDepth);
    const leftFrame = new THREE.Mesh(sideFrameGeometry, topFrameMaterial);
    leftFrame.position.x = -windowWidth/2 - frameThickness/2;
    windowGroup.add(leftFrame);
    
    // Right frame
    const rightFrame = new THREE.Mesh(sideFrameGeometry, topFrameMaterial);
    rightFrame.position.x = windowWidth/2 + frameThickness/2;
    windowGroup.add(rightFrame);

    // Add window model to scene
    sceneRef.current.add(windowGroup);
    windowModelRef.current = windowGroup;
    
    console.log("Window model created and added to scene");
  };

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !windowModelRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
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

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: "300px" }} />;
};
