
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ColorOption } from '@/data/products';

interface Simple3DPreviewProps {
  width: number;
  height: number;
  selectedWindowType: string;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
}

export const Simple3DPreview = ({
  width,
  height,
  selectedWindowType,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating
}: Simple3DPreviewProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing 3D Preview...');
  const [error, setError] = useState<string | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    console.log("Initializing fresh 3D scene");
    setLoadingText('Setting up 3D environment...');

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    console.log("3D scene initialized successfully");

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Load 3D model with improved error handling
  useEffect(() => {
    if (!sceneRef.current) return;

    console.log("Attempting to load 3D model");
    setLoadingText('Loading 3D model...');
    setError(null);

    // Clear existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    // For now, we'll create an enhanced fallback model since the OneDrive link doesn't work
    // The user will need to either:
    // 1. Host the .glb file in the public folder
    // 2. Use a proper CDN link
    // 3. Convert the OneDrive link to a proper direct download URL
    
    console.log("Creating enhanced window model (OneDrive links don't work for direct loading)");
    setLoadingText('Creating detailed window model...');
    createEnhancedWindowModel();
  }, [selectedWindowType, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id]);

  // Create enhanced window model that looks more realistic
  const createEnhancedWindowModel = () => {
    if (!sceneRef.current) return;

    console.log("Creating enhanced window model");
    const windowGroup = new THREE.Group();
    
    // Create main window frame (outer frame)
    const outerFrameGeometry = new THREE.BoxGeometry(2.2, 2.7, 0.15);
    const outerFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(baseColorObject.hex),
      roughness: 0.3,
      metalness: 0.1
    });
    const outerFrame = new THREE.Mesh(outerFrameGeometry, outerFrameMaterial);
    windowGroup.add(outerFrame);

    // Create inner frame (sash)
    const innerFrameGeometry = new THREE.BoxGeometry(1.9, 2.4, 0.1);
    const innerFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(insideColorObject.hex),
      roughness: 0.3,
      metalness: 0.1
    });
    const innerFrame = new THREE.Mesh(innerFrameGeometry, innerFrameMaterial);
    innerFrame.position.z = 0.05;
    windowGroup.add(innerFrame);

    // Create glass panels
    const glassGeometry = new THREE.PlaneGeometry(1.7, 2.2);
    const glassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x87ceeb, 
      transparent: true, 
      opacity: 0.3,
      roughness: 0.0,
      metalness: 0.0
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 0.08;
    windowGroup.add(glass);

    // Add window handle
    const handleGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.03);
    const handleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444,
      roughness: 0.2,
      metalness: 0.8
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.8, 0, 0.12);
    windowGroup.add(handle);

    // Add rubber seals
    const sealGeometry = new THREE.BoxGeometry(2.0, 0.05, 0.02);
    const sealMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(rubberColorObject.hex),
      roughness: 0.8
    });
    
    // Top seal
    const topSeal = new THREE.Mesh(sealGeometry, sealMaterial);
    topSeal.position.set(0, 1.15, 0.02);
    windowGroup.add(topSeal);
    
    // Bottom seal
    const bottomSeal = new THREE.Mesh(sealGeometry, sealMaterial);
    bottomSeal.position.set(0, -1.15, 0.02);
    windowGroup.add(bottomSeal);
    
    // Side seals
    const sideSealGeometry = new THREE.BoxGeometry(0.05, 2.3, 0.02);
    const leftSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
    leftSeal.position.set(-0.97, 0, 0.02);
    windowGroup.add(leftSeal);
    
    const rightSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
    rightSeal.position.set(0.97, 0, 0.02);
    windowGroup.add(rightSeal);

    // Add shadows to all components
    windowGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    sceneRef.current.add(windowGroup);
    modelRef.current = windowGroup;
    setIsLoading(false);
    setError("Using enhanced model - to load your .glb file, please host it in the public folder or use a direct CDN link");
    console.log("Enhanced window model created successfully");
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (modelRef.current) {
        // Apply rotations
        modelRef.current.rotation.x = THREE.MathUtils.degToRad(rotationX);
        
        if (isAutoRotating) {
          modelRef.current.rotation.y += 0.01;
        } else {
          modelRef.current.rotation.y = THREE.MathUtils.degToRad(rotationY);
        }

        // Handle view mode
        if (viewMode === 'back') {
          modelRef.current.rotation.y += Math.PI;
        }
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rotationX, rotationY, viewMode, isAutoRotating]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      <div 
        ref={mountRef}
        className="bg-secondary rounded-lg"
        style={{ 
          height: '450px',
          background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)'
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <div className="text-sm">{loadingText}</div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute top-2 left-2 right-2 bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
