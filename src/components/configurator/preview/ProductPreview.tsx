
import { useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw, Play, Pause, SwitchCamera } from 'lucide-react';
import { ColorOption } from '@/data/products';
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import * as THREE from 'three';
import { createWindowModel } from './utils/windowModelCreator';

interface ProductPreviewProps {
  productType: 'window' | 'door';
  width: number;
  height: number;
  selectedWindowType: string;
  selectedOpeningDirection: string;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  glazingObject: { id: string; name: string };
  profileObject: { id: string; name: string };
  windowTypeObject: WindowType | undefined;
  openingDirectionObject: OpeningDirection | undefined;
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
  onToggleView: () => void;
  onToggleAutoRotation: () => void;
}

export const ProductPreview = ({
  width,
  height,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  selectedWindowType,
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating,
  onRotateLeft,
  onRotateRight,
  onResetRotation,
  onToggleView,
  onToggleAutoRotation
}: ProductPreviewProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const windowModelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.load('/window-texture.jpg', (texture) => {
      textureRef.current = texture;
      createModel();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Create/update window model
  const createModel = () => {
    if (!sceneRef.current || !textureRef.current) return;

    // Remove existing model
    if (windowModelRef.current) {
      sceneRef.current.remove(windowModelRef.current);
      windowModelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    // Create new model
    createWindowModel(
      sceneRef.current,
      windowModelRef,
      {
        width,
        height,
        baseColorObject,
        outsideColorObject,
        insideColorObject,
        rubberColorObject,
        textureRef: { current: textureRef.current },
        windowType: selectedWindowType as 'single-leaf' | 'double-leaf' | 'triple-leaf' | 'fixed'
      }
    );
  };

  // Update model when colors or dimensions change
  useEffect(() => {
    createModel();
  }, [width, height, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id, selectedWindowType]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !windowModelRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      windowModelRef.current.rotation.x = THREE.MathUtils.degToRad(rotationX);
      
      if (isAutoRotating) {
        windowModelRef.current.rotation.y += 0.01;
      } else {
        windowModelRef.current.rotation.y = THREE.MathUtils.degToRad(rotationY);
      }

      if (viewMode === 'back') {
        windowModelRef.current.rotation.y += Math.PI;
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
  }, [rotationX, rotationY, isAutoRotating, viewMode]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Product Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Controls */}
        <div className="flex mb-4 justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {viewMode === 'front' ? 'Outside view' : 'Inside view'} - Use buttons to rotate or switch views
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRotateLeft} 
              disabled={isAutoRotating}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResetRotation}
            >
              Reset
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRotateRight} 
              disabled={isAutoRotating}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button 
              variant={isAutoRotating ? "default" : "outline"} 
              size="sm" 
              onClick={onToggleAutoRotation}
              className="ml-2"
            >
              {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAutoRotating ? 'Stop' : '360° View'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleView}
              className="ml-2"
            >
              <SwitchCamera className="h-4 w-4" />
              {viewMode === 'front' ? 'Show Inside' : 'Show Outside'}
            </Button>
          </div>
        </div>
        
        {/* 3D Preview */}
        <div 
          ref={mountRef}
          className="bg-secondary rounded-lg"
          style={{ 
            height: '450px',
            background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)'
          }}
        />

        {/* Product Info */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Dimensions:</span>
              <br />
              {width} × {height} mm
            </div>
            <div>
              <span className="font-medium">Base Color:</span>
              <br />
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: baseColorObject.hex }}
                />
                {baseColorObject.name}
              </div>
            </div>
            <div>
              <span className="font-medium">Outside Color:</span>
              <br />
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: outsideColorObject.hex }}
                />
                {outsideColorObject.name}
              </div>
            </div>
            <div>
              <span className="font-medium">Inside Color:</span>
              <br />
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: insideColorObject.hex }}
                />
                {insideColorObject.name}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
