'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';

type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    aiHint: string;
};

const projectsData: Project[] = [
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

const ProjectDetails = ({ project }: { project: Project }) => {
    if (!project) return null;

    return (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full p-4 md:p-6"
        >
            <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg">
                <Image src={project.image} alt={project.title} layout="fill" className="object-cover" data-ai-hint={project.aiHint} />
            </div>
            <h3 className="font-headline text-2xl mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 py-4">
                {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <Button asChild variant="outline">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                </Button>
                <Button asChild variant="ghost" className="text-accent">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4"/> Source
                    </a>
                </Button>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
    const planetsRef = useRef<THREE.Mesh[]>([]);
    const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 15));

    const onResize = useCallback((camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    }, []);

    const createPlanetTexture = (color: THREE.Color) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        if (!context) return null;

        const lighterColor = color.clone().multiplyScalar(1.5);
        const darkerColor = color.clone().multiplyScalar(0.5);

        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const radius = Math.random() * 1.5;
            const grad = context.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, `rgba(${lighterColor.r*255}, ${lighterColor.g*255}, ${lighterColor.b*255}, ${Math.random() * 0.5})`);
            grad.addColorStop(1, `rgba(${darkerColor.r*255}, ${darkerColor.g*255}, ${darkerColor.b*255}, 0)`);
            context.fillStyle = grad;
            context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        }
        return new THREE.CanvasTexture(canvas);
    }

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

        const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
        
        planetsRef.current = projectsData.map((project, i) => {
            const color = new THREE.Color(`hsl(${271 + i * 25}, 100%, 74%)`);
            const texture = createPlanetTexture(color);
            const material = new THREE.MeshStandardMaterial({ 
                map: texture,
                color: color,
                roughness: 0.7,
                metalness: 0.1
            });
            const planet = new THREE.Mesh(planetGeometry, material);
            
            const angle = (i / projectsData.length) * Math.PI * 2;
            const radius = 6;
            planet.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 4, Math.sin(angle) * radius);
            
            const scale = Math.random() * 0.8 + 0.8;
            planet.scale.set(scale, scale, scale);
            
            (planet.userData as any).projectData = project;
            scene.add(planet);
            return planet;
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onClick = (event: MouseEvent) => {
            if (!currentMount) return;
            const rect = currentMount.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(planetsRef.current);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object as THREE.Mesh;
                if (intersectedObject.userData.projectData) {
                    setSelectedProject(intersectedObject.userData.projectData);
                    const targetPosition = intersectedObject.position.clone();
                    targetPosition.z += 5; // Zoom in a bit
                    targetRef.current.copy(targetPosition);
                }
            }
        };

        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();

            planetsRef.current.forEach(planet => {
                planet.rotation.y += 0.001;
            });
            
            camera.position.lerp(targetRef.current, 0.05);
            camera.lookAt(0, 0, 0);
            
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => onResize(camera, renderer);
        window.addEventListener('resize', handleResize);
        currentMount.addEventListener('click', onClick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeEventListener('click', onClick);
                if (renderer.domElement.parentElement === currentMount) {
                  currentMount.removeChild(renderer.domElement);
                }
            }
        };

    }, [onResize]);

    return (
        <section id="projects" className="relative py-16 md:py-24 z-10 min-h-screen flex flex-col justify-center">
             <div className="container text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-4">
                My Projects
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore my work by navigating my project solar system. Click on a planet to view its details.
              </p>
            </div>
            <div className="container grid md:grid-cols-2 gap-8 items-center min-h-[60vh]">
                <div ref={mountRef} className="relative w-full h-[40vh] md:h-[60vh] cursor-pointer" />
                <div className="relative w-full h-full min-h-[40vh] md:min-h-[60vh] bg-primary/5 rounded-lg flex items-center justify-center">
                    <AnimatePresence mode="wait">
                       {selectedProject && <ProjectDetails project={selectedProject} />}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Projects;
