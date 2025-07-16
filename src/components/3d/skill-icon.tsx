'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface SkillIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: 'code' | 'settings' | 'bot' | 'database';
  size?: number;
}

const createIconGeometry = (icon: 'code' | 'settings' | 'bot' | 'database'): THREE.BufferGeometry => {
  const shape = new THREE.Shape();
  switch (icon) {
    case 'code': // <>
      shape.moveTo(-1, 0.5);
      shape.lineTo(-0.5, 1);
      shape.lineTo(-1.5, 0);
      shape.lineTo(-0.5, -1);
      shape.lineTo(-1, -0.5);
      shape.lineTo(-1.5, 0);

      shape.moveTo(1, 0.5);
      shape.lineTo(0.5, 1);
      shape.lineTo(1.5, 0);
      shape.lineTo(0.5, -1);
      shape.lineTo(1, -0.5);
      shape.lineTo(1.5, 0);
      break;
    case 'settings': // Gear shape
      const outerRadius = 1;
      const innerRadius = 0.6;
      const teeth = 8;
      for (let i = 0; i < teeth * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (teeth * 2)) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      break;
    case 'bot': // Simple robot head
      shape.moveTo(-1, -0.5);
      shape.lineTo(-1, 0.5);
      shape.lineTo(1, 0.5);
      shape.lineTo(1, -0.5);
      shape.lineTo(-1, -0.5);
      shape.moveTo(-0.5, 0.8);
      shape.lineTo(-0.5, 1);
      shape.moveTo(0.5, 0.8);
      shape.lineTo(0.5, 1);
      break;
    case 'database': // Cylinder
        const cylinder = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 32);
        cylinder.rotateX(Math.PI / 2);
        return cylinder;
  }
  
  const extrudeSettings = { depth: 0.2, bevelEnabled: false };
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

export const SkillIcon: React.FC<SkillIconProps> = ({ icon, size = 60, ...props }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = createIconGeometry(icon);
    const material = new THREE.MeshStandardMaterial({
      color: '#BE77FF',
      metalness: 0.3,
      roughness: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if(isHovered) {
        mesh.rotation.y += 0.05;
        mesh.rotation.x += 0.03;
      } else {
        mesh.rotation.y = elapsedTime * 0.1;
        mesh.rotation.x = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [icon, size, isHovered]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  );
};
