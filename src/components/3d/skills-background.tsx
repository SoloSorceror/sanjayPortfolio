'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SkillsBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const wireframe = new THREE.WireframeGeometry(geometry);
    
    const material = new THREE.LineBasicMaterial({
      color: 'hsl(var(--accent))',
      linewidth: 1,
      transparent: true,
      opacity: 0.2
    });
    
    const line = new THREE.LineSegments(wireframe, material);
    scene.add(line);

    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 'hsl(var(--accent))',
        size: 0.03,
        transparent: true,
        opacity: 0.5,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      line.rotation.x = elapsedTime * 0.1;
      line.rotation.y = elapsedTime * 0.1;
      
      stars.rotation.y = elapsedTime * -0.02;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframe.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default SkillsBackground;
