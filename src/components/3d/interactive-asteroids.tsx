'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export const InteractiveAsteroids = () => {
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

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 30;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(50, 50, 50);
        scene.add(pointLight);

        // Asteroids
        const asteroids: THREE.Mesh[] = [];
        const asteroidGeometry = new THREE.IcosahedronGeometry(1, 1);
        const asteroidMaterial = new THREE.MeshStandardMaterial({
             color: 0xaaaaaa, 
             roughness: 0.8,
             metalness: 0.5
        });

        for (let i = 0; i < 100; i++) {
            const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
            asteroid.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            asteroid.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            const scale = Math.random() * 2 + 0.5;
            asteroid.scale.set(scale, scale, scale);
            (asteroid as any).velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                0
            );
            asteroids.push(asteroid);
            scene.add(asteroid);
        }

        // Mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        let particleSystems: THREE.Points[] = [];

        function createExplosion(position: THREE.Vector3) {
            const particlesCount = 200;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particlesCount * 3);
            const velocities = [];

            for (let i = 0; i < particlesCount; i++) {
                positions[i * 3] = position.x;
                positions[i * 3 + 1] = position.y;
                positions[i * 3 + 2] = position.z;
                
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const speed = Math.random() * 0.5 + 0.2;

                velocities.push(
                    speed * Math.sin(phi) * Math.cos(theta),
                    speed * Math.sin(phi) * Math.sin(theta),
                    speed * Math.cos(phi)
                );
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            (geometry as any).velocities = velocities;

            const material = new THREE.PointsMaterial({
                color: '#BE77FF',
                size: 0.2,
                transparent: true,
                opacity: 1,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });

            const particleSystem = new THREE.Points(geometry, material);
            particleSystem.userData.lifespan = 1.0; // seconds
            scene.add(particleSystem);
            particleSystems.push(particleSystem);
        }


        const onClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(asteroids);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object as THREE.Mesh;
                createExplosion(intersectedObject.position);
                scene.remove(intersectedObject);
                asteroids.splice(asteroids.indexOf(intersectedObject), 1);
            }
        };

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            asteroids.forEach(asteroid => {
                asteroid.position.add((asteroid as any).velocity);
                asteroid.rotation.x += 0.001;
                asteroid.rotation.y += 0.001;
                
                // Boundary checks
                if (asteroid.position.x > 50) asteroid.position.x = -50;
                if (asteroid.position.x < -50) asteroid.position.x = 50;
                if (asteroid.position.y > 50) asteroid.position.y = -50;
                if (asteroid.position.y < -50) asteroid.position.y = 50;
            });
            
            particleSystems.forEach((system, index) => {
                system.userData.lifespan -= delta;
                (system.material as THREE.PointsMaterial).opacity = system.userData.lifespan;

                const positions = system.geometry.attributes.position.array as Float32Array;
                const velocities = (system.geometry as any).velocities;
                for (let i = 0; i < positions.length / 3; i++) {
                    positions[i * 3] += velocities[i * 3] * delta * 20;
                    positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 20;
                    positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 20;
                }
                system.geometry.attributes.position.needsUpdate = true;

                if (system.userData.lifespan <= 0) {
                    scene.remove(system);
                    particleSystems.splice(index, 1);
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => onResize(camera, renderer);
        
        window.addEventListener('resize', handleResize);
        currentMount.addEventListener('click', onClick);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
             if (currentMount) {
                currentMount.removeEventListener('click', onClick);
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [onResize]);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
