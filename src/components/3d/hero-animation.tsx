'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 10000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: '#BE77FF',
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX - windowHalf.x);
        mouse.y = (event.clientY - windowHalf.y);
    }
    document.addEventListener('mousemove', onMouseMove);

    // Clock for animation
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      target.x = (1 - mouse.x) * 0.0005;
      target.y = (1 - mouse.y) * 0.0005;

      // Update particles
      particles.rotation.y = elapsedTime * 0.05 + target.x;
      particles.rotation.x = elapsedTime * 0.02 + target.y;

      // Parallax effect for camera
      camera.position.x += (mouse.x * 0.001 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 0.001 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const onResize = () => {
      windowHalf.set(currentMount.clientWidth / 2, currentMount.clientHeight / 2);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default HeroAnimation;
