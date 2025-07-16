'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

const projectsData = [
  {
    title: 'DayFlow.ai – Smart Productivity Tracker',
    description: 'A full-featured productivity platform that blends smart planning with mindful living. Helps users structure their day, stay focused, and reflect effectively.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'LangChain', 'OpenAI', 'MongoDB', 'Docker', 'GitHub Actions'],
    liveUrl: '#',
    repoUrl: 'https://github.com/SoloSorceror/DayFlow.ai',
    aiHint: 'productivity dashboard AI',
  },
  {
    title: 'Spotify Recommender',
    description: 'A personalized music recommendation system using content-based filtering to suggest songs tailored to user preferences. Built to explore recommendation engines and lightweight ML logic.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'music streaming interface',
  },
  {
    title: 'Medical Diagnosis ML App',
    description: 'Predicts potential diseases based on patient biological data using logistic regression. Focused on preprocessing, feature scaling, and accuracy.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'medical data chart',
  },
   {
    title: 'Personal Portfolio Website',
    description: 'Fully responsive, animated personal website to showcase my work and skills. Designed with simplicity, accessibility, and fluid user experience in mind.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'abstract code animation',
  },
];

const Projects = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<(typeof projectsData[0]) | null>(null);

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
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xBE77FF, 2, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const asteroids: THREE.Group[] = [];
        const asteroidGeometry = new THREE.IcosahedronGeometry(1, 1);
        
        projectsData.forEach((project, i) => {
            const material = new THREE.MeshStandardMaterial({ 
                color: new THREE.Color(`hsl(${271 + i * 15}, 100%, 74%)`),
                roughness: 0.6,
                metalness: 0.3
            });
            const asteroid = new THREE.Mesh(asteroidGeometry, material);
            
            const group = new THREE.Group();
            group.add(asteroid);
            group.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5
            );
            group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            
            const scale = Math.random() * 0.8 + 0.5;
            group.scale.set(scale, scale, scale);
            
            (group as any).velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005
            );

            (group as any).projectData = project;
            asteroids.push(group);
            scene.add(group);
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(asteroids.map(g => g.children[0]));

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                const parentGroup = intersectedObject.parent as THREE.Group & { projectData: typeof projectsData[0] };
                if (parentGroup) {
                    setSelectedProject(parentGroup.projectData);
                }
            }
        };

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            asteroids.forEach(asteroid => {
                asteroid.position.add((asteroid as any).velocity);
                asteroid.rotation.x += 0.0005;
                asteroid.rotation.y += 0.0005;

                if (asteroid.position.x > 20) asteroid.position.x = -20;
                if (asteroid.position.x < -20) asteroid.position.x = 20;
                if (asteroid.position.y > 15) asteroid.position.y = -15;
                if (asteroid.position.y < -15) asteroid.position.y = 15;
            });
            
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => onResize(camera, renderer);
        window.addEventListener('resize', handleResize);
        currentMount.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeEventListener('click', onClick);
                currentMount.removeChild(renderer.domElement);
            }
        };

    }, [onResize]);

    return (
        <div className="relative w-full h-[50vh] md:h-[60vh] cursor-pointer">
            <div ref={mountRef} className="absolute inset-0" />
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-xl">
                    {selectedProject && (
                        <>
                        <DialogHeader>
                             <div className="relative h-48 md:h-64 w-full mb-4 overflow-hidden rounded-lg">
                                <Image src={selectedProject.image} alt={selectedProject.title} layout="fill" className="object-cover" data-ai-hint={selectedProject.aiHint} />
                            </div>
                            <DialogTitle className="font-headline text-2xl">{selectedProject.title}</DialogTitle>
                            <DialogDescription>
                                {selectedProject.description}
                            </DialogDescription>
                        </DialogHeader>
                         <div className="flex flex-wrap gap-2 py-4">
                            {selectedProject.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button asChild variant="outline">
                                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live
                                </a>
                            </Button>
                            <Button asChild variant="ghost" className="text-accent">
                                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4"/> Source
                                </a>
                            </Button>
                        </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Projects;
