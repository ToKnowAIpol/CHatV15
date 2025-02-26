
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: '#9b87f5',
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const spheres: THREE.Mesh[] = [];
    const spherePositions = [
      { x: -2, y: 0, z: 0 },
      { x: 2, y: 1, z: -2 },
      { x: 0, y: -1, z: -1 },
      { x: 1, y: 2, z: -3 },
    ];

    spherePositions.forEach((pos) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.scale.setScalar(Math.random() * 0.5 + 0.5);
      spheres.push(sphere);
      scene.add(sphere);
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 8;

    // Animation
    let frame = 0;
    const animate = () => {
      frame += 0.01;
      
      spheres.forEach((sphere, i) => {
        sphere.position.y += Math.sin(frame + i) * 0.01;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 opacity-60"
      style={{ minHeight: '600px' }}
    />
  );
}
