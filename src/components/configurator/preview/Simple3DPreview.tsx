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
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);
  
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

    // Initialize texture loader
    textureLoaderRef.current = new THREE.TextureLoader();

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

  // Load 3D model with textures
  useEffect(() => {
    if (!sceneRef.current || !textureLoaderRef.current) return;

    console.log("Creating textured dual-color window model");
    setLoadingText('Loading textures and creating window model...');
    setError(null);

    // Clear existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    createTexturedWindowModel();
  }, [selectedWindowType, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id]);

  // Create textured materials from color options
  const createTexturedMaterial = (colorObject: ColorOption, fallbackColor: string): THREE.MeshStandardMaterial => {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorObject.hex),
      roughness: 0.7,
      metalness: 0.1
    });

    // If the color object has an imageUrl, load it as texture
    if (colorObject.imageUrl && textureLoaderRef.current) {
      console.log("Loading texture for", colorObject.name, "from", colorObject.imageUrl);
      
      textureLoaderRef.current.load(
        colorObject.imageUrl,
        (texture) => {
          console.log("Texture loaded successfully for", colorObject.name);
          
          // Configure texture settings for realistic appearance
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(4, 4); // Repeat texture for better detail
          texture.magFilter = THREE.LinearFilter;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          
          // Apply the texture as both color map and normal map for depth
          material.map = texture;
          
          // Create a subtle normal map effect from the same texture
          const normalTexture = texture.clone();
          normalTexture.needsUpdate = true;
          material.normalMap = normalTexture;
          material.normalScale = new THREE.Vector2(0.3, 0.3);
          
          // Enhance material properties for textured appearance
          material.roughness = 0.8;
          material.metalness = 0.05;
          material.needsUpdate = true;
          
          console.log("Material updated with texture for", colorObject.name);
        },
        (progress) => {
          console.log("Loading texture progress:", progress.loaded / progress.total * 100 + '%');
        },
        (error) => {
          console.warn("Failed to load texture for", colorObject.name, error);
          // Keep the base color material as fallback
        }
      );
    }

    return material;
  };

  // Create enhanced window model with textured dual-color functionality
  const createTexturedWindowModel = () => {
    if (!sceneRef.current) return;

    console.log("Creating textured dual-color window model");
    const windowGroup = new THREE.Group();
    
    // Create textured materials for different parts
    const baseMaterial = createTexturedMaterial(baseColorObject, baseColorObject.hex);
    const outsideMaterial = createTexturedMaterial(outsideColorObject, outsideColorObject.hex);
    const insideMaterial = createTexturedMaterial(insideColorObject, insideColorObject.hex);
    const rubberMaterial = createTexturedMaterial(rubberColorObject, rubberColorObject.hex);
    
    // Special settings for rubber material
    rubberMaterial.roughness = 0.9;
    rubberMaterial.metalness = 0.0;

    // Create main window frame with textured dual colors
    const frameGeometry = new THREE.BoxGeometry(2.2, 2.7, 0.15);
    
    // Create frame with different materials for each face
    // Face order: +X, -X, +Y, -Y, +Z (outside), -Z (inside)
    const frameMaterials = [
      baseMaterial,    // Right side
      baseMaterial,    // Left side  
      baseMaterial,    // Top
      baseMaterial,    // Bottom
      outsideMaterial, // Outside face (+Z)
      insideMaterial   // Inside face (-Z)
    ];
    
    const outerFrame = new THREE.Mesh(frameGeometry, frameMaterials);
    windowGroup.add(outerFrame);

    // Create inner frame (sash) with textured dual colors
    const innerFrameGeometry = new THREE.BoxGeometry(1.9, 2.4, 0.1);
    const innerFrameMaterials = [
      baseMaterial,    // Right side
      baseMaterial,    // Left side
      baseMaterial,    // Top
      baseMaterial,    // Bottom  
      outsideMaterial, // Outside face
      insideMaterial   // Inside face
    ];
    
    const innerFrame = new THREE.Mesh(innerFrameGeometry, innerFrameMaterials);
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

    // Add window handle with textured base color
    const handleGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.03);
    const handleMaterial = createTexturedMaterial(baseColorObject, baseColorObject.hex);
    handleMaterial.color.multiplyScalar(0.7); // Darker for handle
    handleMaterial.metalness = 0.8;
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.8, 0, 0.12);
    windowGroup.add(handle);

    // Add textured rubber seals
    // Create seal geometries
    const horizontalSealGeometry = new THREE.BoxGeometry(2.0, 0.05, 0.02);
    const verticalSealGeometry = new THREE.BoxGeometry(0.05, 2.3, 0.02);
    
    // Top seal
    const topSeal = new THREE.Mesh(horizontalSealGeometry, rubberMaterial);
    topSeal.position.set(0, 1.15, 0.02);
    windowGroup.add(topSeal);
    
    // Bottom seal
    const bottomSeal = new THREE.Mesh(horizontalSealGeometry, rubberMaterial);
    bottomSeal.position.set(0, -1.15, 0.02);
    windowGroup.add(bottomSeal);
    
    // Left seal
    const leftSeal = new THREE.Mesh(verticalSealGeometry, rubberMaterial);
    leftSeal.position.set(-0.97, 0, 0.02);
    windowGroup.add(leftSeal);
    
    // Right seal
    const rightSeal = new THREE.Mesh(verticalSealGeometry, rubberMaterial);
    rightSeal.position.set(0.97, 0, 0.02);
    windowGroup.add(rightSeal);

    // Add window divisions for multi-leaf windows
    if (selectedWindowType === 'double-leaf') {
      createWindowDivision(windowGroup, 0, baseMaterial, outsideMaterial, insideMaterial);
    } else if (selectedWindowType === 'triple-leaf') {
      createWindowDivision(windowGroup, -0.7, baseMaterial, outsideMaterial, insideMaterial);
      createWindowDivision(windowGroup, 0.7, baseMaterial, outsideMaterial, insideMaterial);
    }

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
    console.log("Textured dual-color window model created successfully");
  };

  // Helper function to create textured window divisions
  const createWindowDivision = (
    group: THREE.Group, 
    xPosition: number, 
    baseMaterial: THREE.Material,
    outsideMaterial: THREE.Material,
    insideMaterial: THREE.Material
  ) => {
    const divisionGeometry = new THREE.BoxGeometry(0.05, 2.4, 0.1);
    const divisionMaterials = [
      baseMaterial,    // Right side
      baseMaterial,    // Left side
      baseMaterial,    // Top
      baseMaterial,    // Bottom
      outsideMaterial, // Outside face
      insideMaterial   // Inside face
    ];
    
    const division = new THREE.Mesh(divisionGeometry, divisionMaterials);
    division.position.set(xPosition, 0, 0.05);
    group.add(division);
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
        <div className="absolute top-2 left-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
