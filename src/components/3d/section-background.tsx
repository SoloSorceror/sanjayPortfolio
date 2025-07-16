'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface SectionBackgroundProps {
  effect: 'orbs' | 'grid' | 'particles';
}

const SectionBackground = ({ effect }: SectionBackgroundProps) => {
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    let objects: THREE.Object3D[] = [];
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to [-1, 1] range relative to the entire document
      // This helps with consistency when the canvas doesn't fill the screen
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    if (effect === 'orbs') {
        const light = new THREE.PointLight(0xBE77FF, 200, 100);
        light.position.set(0, 0, 2);
        scene.add(light);
        const ambient = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambient);

        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color(0xBE77FF).multiplyScalar(Math.random() * 0.5 + 0.5),
                shininess: 80,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            (sphere as any).velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            scene.add(sphere);
            objects.push(sphere);
        }
    } else if (effect === 'grid') {
        const gridHelper = new THREE.GridHelper(50, 50, 0xBE77FF, 0x555555);
        gridHelper.rotation.x = Math.PI / 3;
        scene.add(gridHelper);
        objects.push(gridHelper);
    } else if (effect === 'particles') {
        const particlesCount = 300;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 15;
        }
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.015,
          color: '#BE77FF',
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        objects.push(particles);
    }

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if(effect === 'orbs') {
        objects.forEach(obj => {
            obj.position.add((obj as any).velocity);
            if(obj.position.length() > 8) {
                obj.position.negate();
            }
        });
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
      } else if(effect === 'grid') {
        objects[0].rotation.y = elapsedTime * 0.1;
        objects[0].position.y = Math.sin(elapsedTime * 0.5) * 2;
        camera.position.x += (mouse.x - camera.position.x) * 0.05;
        camera.lookAt(scene.position);
      } else if (effect === 'particles') {
        objects[0].rotation.y = elapsedTime * 0.05 + (mouse.x * 0.2);
        objects[0].rotation.x = elapsedTime * 0.02 + (mouse.y * 0.2);
      }

      renderer.render(scene, camera);
    };

    const handleResize = () => onResize(camera, renderer);
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      objects.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [effect, onResize]);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20" />;
};

export default SectionBackground;
