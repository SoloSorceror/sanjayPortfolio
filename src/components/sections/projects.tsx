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


const createRobotMesh = (): THREE.Group => {
    const group = new THREE.Group();
    const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5, metalness: 0.8 })
    );
    head.position.y = 0.6;
    group.add(head);

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.0, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6, metalness: 0.7 })
    );
    group.add(body);

    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const eye1 = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), eyeMaterial);
    eye1.position.set(-0.2, 0.7, 0.41);
    group.add(eye1);
    
    const eye2 = eye1.clone();
    eye2.position.x = 0.2;
    group.add(eye2);

    return group;
}


const ProjectDetails = ({ project }: { project: Project | null }) => {
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
                <Image src={project.image} alt={project.title} fill className="object-cover" data-ai-hint={project.aiHint} />
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
    const robotsRef = useRef<THREE.Group[]>([]);
    const [hoveredRobot, setHoveredRobot] = useState<THREE.Object3D | null>(null);

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
        camera.position.set(0, 2, 12);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xBE77FF, 10, 100);
        pointLight.position.set(0, 10, 10);
        scene.add(pointLight);

        robotsRef.current = projectsData.map((project, i) => {
            const robot = createRobotMesh();
            robot.userData = { projectData: project, index: i };
            scene.add(robot);
            return robot;
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event: MouseEvent) => {
            if (!currentMount) return;
            const rect = currentMount.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(robotsRef.current, true);

            const firstIntersectedGroup = intersects[0]?.object.parent;
            if (firstIntersectedGroup instanceof THREE.Group) {
                 if (hoveredRobot !== firstIntersectedGroup) {
                    setHoveredRobot(firstIntersectedGroup);
                 }
            } else {
                setHoveredRobot(null);
            }
        };

        const onClick = () => {
            if (hoveredRobot) {
                const robotData = (hoveredRobot as THREE.Group).userData;
                if (robotData.projectData.title !== selectedProject.title) {
                    setSelectedProject(robotData.projectData);
                }
            }
        };

        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();

            robotsRef.current.forEach(robot => {
                 const isSelected = robot.userData.projectData.title === selectedProject.title;
                 const isHovered = robot === hoveredRobot;
                 
                 let targetPosition = new THREE.Vector3();
                 let targetScale = new THREE.Vector3(1, 1, 1);
                 
                 if(isSelected) {
                     targetPosition.set(0, 0, 4);
                     targetScale.set(2, 2, 2);
                 } else {
                    const orbitingRobots = robotsRef.current.filter(r => r.userData.projectData.title !== selectedProject.title);
                    const indexInOrbit = orbitingRobots.findIndex(r => r === robot);
                    const angle = (performance.now() * 0.0003) + (indexInOrbit / orbitingRobots.length) * Math.PI * 2;
                    const radius = 6;
                    targetPosition.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius - 2);
                 }

                 if (isHovered && !isSelected) {
                    targetScale.multiplyScalar(1.2);
                 }

                 robot.position.lerp(targetPosition, 0.05);
                 robot.scale.lerp(targetScale, 0.1);
                 
                 if (isSelected) {
                    robot.rotation.y += delta * 0.4;
                 } else {
                    robot.rotation.y += delta * 0.1;
                 }
                 robot.lookAt(camera.position);

            });
            
            camera.lookAt(scene.position);
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
    }, [onResize, selectedProject]);

    return (
        <section id="projects" className="relative py-16 md:py-24 z-10 min-h-screen flex flex-col justify-center">
             <div className="container text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-4">
                My Projects
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                An interactive showcase of my work. Hover and click the robots to explore the projects.
              </p>
            </div>
            <div className="container grid md:grid-cols-2 gap-8 items-center min-h-[60vh]">
                <div ref={mountRef} className="relative w-full h-[40vh] md:h-[60vh] cursor-pointer" />
                <div className="relative w-full h-full min-h-[40vh] md:min-h-[60vh] bg-primary/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-border/20">
                    <AnimatePresence mode="wait">
                       <ProjectDetails project={selectedProject} />
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
