import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VersaceBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // More intense, smooth color palette
    const colors = [
      0x6A5ACD,   // Smooth Slate Blue
      0x4169E1,   // Royal Blue with depth
      0x8A2BE2,   // Deep Blue Violet
      0x483D8B,   // Dark Slate Blue
      0x5D3FD3    // Rich Iris Purple
    ];

    // Geometric shapes inspired by Versace patterns
    const shapes = [];
    for (let i = 0; i < 30; i++) {
      // Create elegant, flowing geometric forms
      const geometries = [
        new THREE.CylinderGeometry(0.1, 0.1, 5, 32),
        new THREE.ConeGeometry(0.2, 3, 32),
        new THREE.TorusKnotGeometry(0.5, 0.1, 100, 16)
      ];

      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
        metalness: 0.4,
        roughness: 0.5
      });

      const shape = new THREE.Mesh(geometry, material);
      
      // Random positioning
      shape.position.set(
        Math.random() * 20 - 10, 
        Math.random() * 20 - 10, 
        Math.random() * -20
      );
      
      // Add rotation and movement properties
      shape.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.02
      };
      
      scene.add(shape);
      shapes.push(shape);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera positioning
    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move and rotate shapes
      shapes.forEach(shape => {
        shape.position.x += shape.velocity.x;
        shape.position.y += shape.velocity.y;
        shape.position.z += shape.velocity.z;

        shape.rotation.x += shape.velocity.rotX;
        shape.rotation.y += shape.velocity.rotY;

        // Boundary wrapping
        if (Math.abs(shape.position.x) > 10) shape.velocity.x *= -1;
        if (Math.abs(shape.position.y) > 10) shape.velocity.y *= -1;
        if (Math.abs(shape.position.z) > 10) shape.velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    zIndex: -1 
  }} />;
};

export default VersaceBackground;
