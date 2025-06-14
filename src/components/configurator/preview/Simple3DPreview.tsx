
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

  // Load 3D model
  useEffect(() => {
    if (!sceneRef.current) return;

    console.log("Loading 3D model from OneDrive");
    setLoadingText('Loading 3D model...');
    setError(null);

    // Clear existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    const loader = new GLTFLoader();
    // Convert OneDrive sharing link to direct download link
    const oneDriveUrl = "https://1drv.ms/u/c/55aa21a38a5a57e0/EYRrc3FqCrBLsVxOICJhMaMBnhS8h3WPRHQrRxjA_F3nQg?e=lGOYis";
    const directDownloadUrl = oneDriveUrl + "&download=1";

    console.log("Attempting to load model from:", directDownloadUrl);

    loader.load(
      directDownloadUrl,
      (gltf) => {
        console.log("3D model loaded successfully", gltf);
        const model = gltf.scene;
        
        // Scale and center the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        
        // Scale to fit nicely in the view
        const scale = 3 / maxDimension;
        model.scale.setScalar(scale);
        
        // Center the model
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));
        
        // Apply colors to the model materials
        applyColorsToModel(model, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
        
        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        sceneRef.current!.add(model);
        modelRef.current = model;
        setIsLoading(false);
        setError(null);
        console.log("Model added to scene successfully");
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setLoadingText(`Loading model: ${percent}%`);
          console.log(`Loading progress: ${percent}%`);
        }
      },
      (error) => {
        console.error("Failed to load GLTF model:", error);
        setError("Failed to load 3D model. Creating fallback...");
        createFallbackModel();
      }
    );
  }, [selectedWindowType, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id]);

  // Apply colors to the loaded model
  const applyColorsToModel = (
    model: THREE.Group,
    baseColor: ColorOption,
    outsideColor: ColorOption,
    insideColor: ColorOption,
    rubberColor: ColorOption
  ) => {
    console.log("Applying colors to 3D model");
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const name = child.name.toLowerCase();
        const materialName = child.material instanceof THREE.Material ? child.material.name?.toLowerCase() : '';
        
        // Apply colors based on object or material names
        if (name.includes('frame') || materialName.includes('frame')) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(parseInt(baseColor.hex.replace('#', '0x')));
          }
        } else if (name.includes('outside') || materialName.includes('outside')) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(parseInt(outsideColor.hex.replace('#', '0x')));
          }
        } else if (name.includes('inside') || materialName.includes('inside')) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(parseInt(insideColor.hex.replace('#', '0x')));
          }
        } else if (name.includes('rubber') || name.includes('seal') || materialName.includes('rubber')) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(parseInt(rubberColor.hex.replace('#', '0x')));
          }
        }
      }
    });
  };

  // Create fallback model if GLTF fails
  const createFallbackModel = () => {
    if (!sceneRef.current) return;

    console.log("Creating fallback window model");
    setLoadingText('Creating fallback model...');

    const windowGroup = new THREE.Group();
    
    // Create window frame
    const frameGeometry = new THREE.BoxGeometry(2, 2.5, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(baseColorObject.hex) 
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    
    // Create glass
    const glassGeometry = new THREE.PlaneGeometry(1.8, 2.3);
    const glassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x87ceeb, 
      transparent: true, 
      opacity: 0.3 
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 0.01;
    
    windowGroup.add(frame);
    windowGroup.add(glass);
    
    sceneRef.current.add(windowGroup);
    modelRef.current = windowGroup;
    setIsLoading(false);
    console.log("Fallback model created");
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
