
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

  // Load 3D model with multiple URL attempts
  useEffect(() => {
    if (!sceneRef.current) return;

    console.log("Attempting to load 3D model from OneDrive");
    setLoadingText('Loading 3D model from OneDrive...');
    setError(null);

    // Clear existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    const loader = new GLTFLoader();
    
    // Try multiple URL formats for OneDrive
    const urlVariants = [
      "https://1drv.ms/u/c/55aa21a38a5a57e0/EYRrc3FqCrBLsVxOICJhMaMBnhS8h3WPRHQrRxjA_F3nQg?e=lGOYis&download=1",
      "https://onedrive.live.com/download?cid=55aa21a38a5a57e0&resid=55AA21A38A5A57E0%21113&authkey=AC1zdkqvAvFbsVw",
      "https://1drv.ms/u/s!AhVZ6juaUgVicXZKr1sAuysxoxQ?e=lGOYis&download=1"
    ];

    let currentUrlIndex = 0;

    const tryLoadModel = (urlIndex: number) => {
      if (urlIndex >= urlVariants.length) {
        console.error("All URL variants failed, creating fallback model");
        setError("Could not load .glb file from OneDrive. Using enhanced fallback model.");
        createEnhancedWindowModel();
        return;
      }

      const currentUrl = urlVariants[urlIndex];
      console.log(`Trying URL variant ${urlIndex + 1}:`, currentUrl);
      setLoadingText(`Trying to load model (attempt ${urlIndex + 1}/${urlVariants.length})...`);

      loader.load(
        currentUrl,
        (gltf) => {
          console.log("✅ GLTF model loaded successfully!", gltf);
          setLoadingText('Processing 3D model...');
          
          const loadedModel = gltf.scene;
          loadedModel.name = 'loaded-window-model';
          
          // Scale and position the model
          const box = new THREE.Box3().setFromObject(loadedModel);
          const size = box.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);
          
          if (maxDimension > 0) {
            const scale = 2.5 / maxDimension;
            loadedModel.scale.setScalar(scale);
            
            const center = box.getCenter(new THREE.Vector3());
            loadedModel.position.sub(center.multiplyScalar(scale));
          }

          // Apply colors to the loaded model
          applyColorsToLoadedModel(loadedModel, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
          
          // Add shadows
          loadedModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          sceneRef.current!.add(loadedModel);
          modelRef.current = loadedModel;
          setIsLoading(false);
          setError(null);
          console.log("🎉 Model successfully added to scene");
        },
        (progress) => {
          const percentComplete = Math.round((progress.loaded / progress.total) * 100);
          console.log(`Loading progress: ${percentComplete}%`);
          setLoadingText(`Loading model... ${percentComplete}%`);
        },
        (error) => {
          console.error(`❌ Failed to load URL ${urlIndex + 1}:`, error);
          console.error("Error details:", {
            message: error.message,
            type: error.constructor.name,
            stack: error.stack
          });
          
          // Try next URL variant
          setTimeout(() => tryLoadModel(urlIndex + 1), 500);
        }
      );
    };

    // Start loading attempts
    tryLoadModel(0);
  }, [selectedWindowType, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id]);

  // Apply colors to loaded model
  const applyColorsToLoadedModel = (
    model: THREE.Group,
    baseColor: ColorOption,
    outsideColor: ColorOption,
    insideColor: ColorOption,
    rubberColor: ColorOption
  ) => {
    console.log("Applying colors to loaded 3D model");
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        console.log("Processing mesh:", name);
        
        let targetColor = baseColor.hex;
        
        if (name.includes('outside') || name.includes('exterior')) {
          targetColor = outsideColor.hex;
        } else if (name.includes('inside') || name.includes('interior')) {
          targetColor = insideColor.hex;
        } else if (name.includes('rubber') || name.includes('seal')) {
          targetColor = rubberColor.hex;
        }
        
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.setHex(parseInt(targetColor.replace('#', '0x')));
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(parseInt(targetColor.replace('#', '0x')));
        }
      }
    });
  };

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
        <div className="absolute top-2 left-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
