import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PsychedelicBackground = () => {
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

    // Soft, elegant color palette inspired by luxury fashion
    const colors = [
      0xf3e5f5,   // Soft Lavender
      0xfff3e0,   // Delicate Peach
      0xe0f2f1,   // Pale Mint
      0xfbe9e7,   // Subtle Rose
      0xf1f8e9    // Soft Sage
    ];

    // Background with soft gradient
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      varying vec2 vUv;
      void main() {
        vec3 color = mix(colorBottom, colorTop, vUv.y);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const backgroundGeometry = new THREE.PlaneGeometry(2, 2);
    const backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        colorTop: { value: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]) },
        colorBottom: { value: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]) }
      }
    });

    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    scene.add(backgroundMesh);

    // Elegant fluid shapes
    const fluidShapes = [];
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          Math.random() * 10 - 5, 
          Math.random() * 10 - 5, 
          Math.random() * -10
        ),
        new THREE.Vector3(
          Math.random() * 10 - 5, 
          Math.random() * 10 - 5, 
          Math.random() * -10
        ),
        new THREE.Vector3(
          Math.random() * 10 - 5, 
          Math.random() * 10 - 5, 
          Math.random() * -10
        )
      ]);

      const points = geometry.getPoints(50);
      const tubeGeometry = new THREE.TubeGeometry(geometry, 70, 0.05, 8, false);
      
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.3,
        metalness: 0.5,
        roughness: 0.5
      });

      const tube = new THREE.Mesh(tubeGeometry, material);
      scene.add(tube);
      fluidShapes.push({
        mesh: tube,
        velocity: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera positioning
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Move fluid shapes
      fluidShapes.forEach(shape => {
        shape.mesh.position.x += shape.velocity.x;
        shape.mesh.position.y += shape.velocity.y;
        shape.mesh.position.z += shape.velocity.z;

        // Gentle boundary wrapping
        if (Math.abs(shape.mesh.position.x) > 5) shape.velocity.x *= -1;
        if (Math.abs(shape.mesh.position.y) > 5) shape.velocity.y *= -1;
        if (Math.abs(shape.mesh.position.z) > 5) shape.velocity.z *= -1;
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

export default PsychedelicBackground;
