
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

export const OrbitingOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback((camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    let animationFrameId: number;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xBE77FF, 1.5, 100);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-5, -5, 5);
    scene.add(directionalLight);


    // Main Orb
    const orbGeometry = new THREE.IcosahedronGeometry(1, 15);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: '#BE77FF',
      metalness: 0.1,
      roughness: 0.3,
      flatShading: true,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Orbiting particles
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = Math.random() * 1.0 + 1.5;
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        particleGroup.add(particle);
    }
    
    // Mouse tracking
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
        const rect = currentMount.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate main orb
      orb.rotation.y = elapsedTime * 0.2;
      orb.rotation.x = elapsedTime * 0.1;

      // Animate particle group
      particleGroup.rotation.y = -elapsedTime * 0.3;
      
      // Parallax effect
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const handleResize = () => onResize(camera, renderer);
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      orbGeometry.dispose();
      orbMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [onResize]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
