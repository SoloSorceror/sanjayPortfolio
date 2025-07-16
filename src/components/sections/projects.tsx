'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';

type ProjectIcon = 'code' | 'bot' | 'database' | 'settings';

type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    aiHint: string;
    icon: ProjectIcon;
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
    icon: 'bot',
  },
  {
    title: 'Spotify Recommender',
    description: 'A personalized music recommendation system using content-based filtering to suggest songs tailored to user preferences. Built to explore recommendation engines and lightweight ML logic.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'music streaming interface',
    icon: 'settings',
  },
  {
    title: 'Medical Diagnosis ML App',
    description: 'Predicts potential diseases based on patient biological data using logistic regression. Focused on preprocessing, feature scaling, and accuracy.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'medical data chart',
    icon: 'database',
  },
   {
    title: 'Personal Portfolio Website',
    description: 'Fully responsive, animated personal website to showcase my work and skills. Designed with simplicity, accessibility, and fluid user experience in mind.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'abstract code animation',
    icon: 'code',
  },
];

const createIconGeometry = (icon: ProjectIcon): THREE.BufferGeometry => {
    switch (icon) {
        case 'code': {
            const shape = new THREE.Shape();
            shape.moveTo(-1, 0.5);
            shape.lineTo(-0.5, 1);
            shape.lineTo(-1.5, 0);
            shape.lineTo(-0.5, -1);
            shape.lineTo(-1, -0.5);
            return new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false }).center();
        }
        case 'settings':
            return new THREE.TorusKnotGeometry(0.7, 0.2, 100, 16).center();
        case 'bot':
            return new THREE.BoxGeometry(1.2, 1.2, 1.2).center();
        case 'database':
            return new THREE.CylinderGeometry(0.8, 0.8, 1.2, 32).rotateX(Math.PI / 2).center();
    }
    return new THREE.BoxGeometry(1, 1, 1).center();
};


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
            <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                <Image src={project.image} alt={project.title} layout="fill" className="object-cover" data-ai-hint={project.aiHint} />
            </div>
            <h3 className="font-headline text-2xl mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2 py-4">
                {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button asChild variant="outline" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
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
    const iconsRef = useRef<THREE.Mesh[]>([]);
    const [hoveredIcon, setHoveredIcon] = useState<THREE.Object3D | null>(null);

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
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xBE77FF, 3, 100);
        pointLight.position.set(5, 5, 10);
        scene.add(pointLight);

        const material = new THREE.MeshStandardMaterial({
            color: 0xBE77FF,
            metalness: 0.1,
            roughness: 0.4,
        });

        iconsRef.current = projectsData.map((project, i) => {
            const geometry = createIconGeometry(project.icon);
            const iconMesh = new THREE.Mesh(geometry, material);

            const angle = (i / projectsData.length) * Math.PI * 2;
            const radius = 4;
            iconMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
            
            iconMesh.userData.projectData = project;
            scene.add(iconMesh);
            return iconMesh;
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event: MouseEvent) => {
            if (!currentMount) return;
            const rect = currentMount.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(iconsRef.current);
            if (intersects.length > 0) {
                setHoveredIcon(intersects[0].object);
            } else {
                setHoveredIcon(null);
            }
        };

        const onClick = () => {
            if (hoveredIcon) {
                setSelectedProject((hoveredIcon as THREE.Mesh).userData.projectData);
            }
        };

        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();

            iconsRef.current.forEach(icon => {
                let speed = 0.5;
                if (icon === hoveredIcon) {
                    speed = 2.5;
                }
                 if ((icon as THREE.Mesh).userData.projectData.title === selectedProject.title) {
                    // Make selected icon larger and bring it forward slightly
                    icon.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
                } else {
                    icon.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                }
                icon.rotation.x += delta * speed * 0.1;
                icon.rotation.y += delta * speed * 0.2;
            });

            scene.rotation.y += delta * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => onResize(camera, renderer);
        window.addEventListener('resize', handleResize);
        currentMount.addEventListener('mousemove', onMouseMove);
        currentMount.addEventListener('click', onClick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeEventListener('mousemove', onMouseMove);
                currentMount.removeEventListener('click', onClick);
                if (renderer.domElement.parentElement === currentMount) {
                  currentMount.removeChild(renderer.domElement);
                }
            }
        };

    }, [onResize, hoveredIcon, selectedProject]);

    return (
        <section id="projects" className="relative py-16 md:py-24 z-10 min-h-screen flex flex-col justify-center">
             <div className="container text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-4">
                My Projects
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                An interactive showcase of my work. Click on the 3D icons to explore the projects.
              </p>
            </div>
            <div className="container grid md:grid-cols-2 gap-8 items-center min-h-[60vh]">
                <div ref={mountRef} className="relative w-full h-[40vh] md:h-[60vh] cursor-pointer" />
                <div className="relative w-full h-full min-h-[40vh] md:min-h-[60vh] bg-primary/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-border/20">
                    <AnimatePresence mode="wait">
                       {selectedProject && <ProjectDetails project={selectedProject} />}
                    </AnimatePresence>
                </div>
            </div>
            <div className="container text-center mt-12">
                <Button asChild>
                    <a href="https://github.com/SoloSorceror" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4"/> View All Projects on GitHub
                    </a>
                </Button>
            </div>
        </section>
    );
};

export default Projects;
