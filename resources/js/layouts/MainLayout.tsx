import { Link } from '@inertiajs/react';
import { type ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Code, Cog, Database, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Sun, Moon, CheckCircle, Star } from 'lucide-react';

interface MainLayoutProps {
    children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [darkMode, setDarkMode] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({ industry: '', goal: '', urgency: '' });
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [draggedSphere, setDraggedSphere] = useState<string | null>(null);
    const [spherePositions, setSpherePositions] = useState<Record<string, { x: number; y: number }>>({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);
    const [spheresVisible, setSpheresVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    const taglines = [
        'Impulso tu negocio con tecnología simple, eficiente y escalable.',
       
    ];

    // Mouse tracking for particles
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }, []);

    // Particle system
    useEffect(() => {
        const createParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            }));
            setParticles(newParticles);
        };

        const updateParticles = () => {
            setParticles(prev => prev.map(particle => {
                let newX = particle.x + particle.vx;
                let newY = particle.y + particle.vy;

                // Boundary checks
                if (newX < 0 || newX > window.innerWidth) particle.vx *= -1;
                if (newY < 0 || newY > window.innerHeight) particle.vy *= -1;

                // Mouse attraction
                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150 && particle.id < 20) { // Only first 20 particles are attracted
                    particle.vx += dx * 0.00005;
                    particle.vy += dy * 0.00005;
                }

                return {
                    ...particle,
                    x: Math.max(0, Math.min(window.innerWidth, newX)),
                    y: Math.max(0, Math.min(window.innerHeight, newY))
                };
            }));
        };

        createParticles();
        const interval = setInterval(updateParticles, 16); // ~60fps

        return () => clearInterval(interval);
    }, [mousePosition]);

    // Typewriter effect
    useEffect(() => {
        const fullText = 'Claudio Aguilera';
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setTypewriterText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    setIsVisible(true);
                    // Start spheres animation after logo entrance (1s delay + 1.5s animation)
                    setTimeout(() => setSpheresVisible(true), 2500);
                }, 500);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    // Dynamic tagline rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex(prev => (prev + 1) % taglines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [taglines.length]);

    // Intersection observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Performance optimization: Reduce motion for users who prefer it
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        }
    }, []);

    // Theme and mouse listeners
    useEffect(() => {
        // Check for saved theme preference or default to light theme
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Default to light theme unless explicitly set to dark
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        // Mouse move listener
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    const handleQuizAnswer = (question: string, answer: string) => {
        setQuizAnswers(prev => ({ ...prev, [question]: answer }));
        if (quizStep < 2) {
            setQuizStep(prev => prev + 1);
        } else {
            setShowRecommendation(true);
        }
    };

    const getRecommendation = () => {
        const { industry, goal, urgency } = quizAnswers;
        if (goal === 'digitalizar') return 'Desarrollo Web Profesional';
        if (goal === 'automatizar') return 'Automatización de Procesos';
        if (goal === 'vender') return 'Tiendas E-commerce';
        if (goal === 'analizar') return 'Sistemas ERP/CRM a Medida';
        return 'Plataformas SaaS (LunaSuite)';
    };

    const handleDragStart = (e: React.DragEvent, sphereId: string) => {
        setDraggedSphere(sphereId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedSphere(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedSphere && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            setSpherePositions(prev => ({
                ...prev,
                [draggedSphere]: { x, y }
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/logoclaudioaguilera.png"
                                    alt="Claudio Aguilera Logo"
                                    className="h-8 w-auto bg-white rounded p-1"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="#hero"
                                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                                Inicio
                            </a>
                            <a
                                href="#sobre-mi"
                                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                                Sobre mí
                            </a>
                            <a
                                href="#servicios"
                                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                                Servicios
                            </a>
                            <a
                                href="#portafolio"
                                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                                Portafolio
                            </a>
                            <a
                                href="#contacto"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                                Contacto
                            </a>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="text-slate-300 hover:text-white focus:outline-none focus:text-white"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 backdrop-blur-md">
                        <a
                            href="#hero"
                            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white cursor-pointer"
                        >
                            Inicio
                        </a>
                        <a
                            href="#sobre-mi"
                            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white cursor-pointer"
                        >
                            Sobre mí
                        </a>
                        <a
                            href="#servicios"
                            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white cursor-pointer"
                        >
                            Servicios
                        </a>
                        <a
                            href="#portafolio"
                            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white cursor-pointer"
                        >
                            Portafolio
                        </a>
                        <a
                            href="#contacto"
                            className="block px-3 py-2 text-base font-medium bg-indigo-600 text-white rounded-md cursor-pointer"
                        >
                            Contacto
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 pt-16">
                {/* Hero Section - Space Module */}
                <section id="hero" ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white min-h-[70vh] flex items-center justify-center">
                    {/* Aurora effect on edges */}
                    <div className="aurora-effect"></div>

                    {/* Space background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-slate-900/40"></div>

                    {/* Stars effect */}
                    <div className="absolute inset-0">
                        <div className="stars-small"></div>
                        <div className="stars-medium"></div>
                        <div className="stars-large"></div>
                    </div>

                    {/* Nebula effect */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/8 rounded-full blur-2xl"></div>
                    </div>

                    {/* Particle system */}
                    <div className="absolute inset-0 pointer-events-none">
                        {particles.map(particle => (
                            <div
                                key={particle.id}
                                className="particle"
                                style={{
                                    left: particle.x,
                                    top: particle.y,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight text-white">
                                        {typewriterText}<span className="animate-pulse">|</span>
                                    </h1>
                                    <h2 className="text-lg md:text-xl font-light mb-4 text-slate-300 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                                        Desarrollo Full-Stack para PyMEs
                                    </h2>
                                    <p className={`text-base md:text-lg text-slate-400 leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ minHeight: '1.25em', display: 'block' }}>
                                        {taglines[taglineIndex]}
                                    </p>
                                </div>

                                <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <Link
                                        href="#servicios"
                                        className="ripple-effect inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 group shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                    >
                                        Ver Servicios
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="#contacto"
                                        className="ripple-effect inline-flex items-center justify-center px-6 py-3 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300 shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                    >
                                        Solicitar presupuesto
                                    </Link>
                                </div>
                            </div>

                            <div className="relative" ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                                    <img
                                        src="/claudioaguilera.jpg"
                                        alt="Claudio Aguilera - Desarrollador Full Stack"
                                        className="w-64 h-64 object-cover rounded-full border-4 border-white/20 shadow-2xl logo-entrance"
                                        style={{ animation: 'logo-entrance 1.5s ease-out 1s forwards' }}
                                    />
                                </div>

                                {/* Interactive orbiting technology spheres */}
                                <div className={`absolute inset-0 transition-opacity duration-1000 ${spheresVisible ? 'opacity-100' : 'opacity-0'}`}>
                                    {[
                                        { id: 'react', logo: '/tecnologias/react.webp', color: 'slate', animation: 'orbit-a 25s linear infinite', delay: 0 },
                                        { id: 'laravel', logo: '/tecnologias/Laravel_logo-700x508.webp', color: 'slate', animation: 'orbit-b 28s linear infinite', delay: 0.2 },
                                        { id: 'typescript', logo: '/tecnologias/typescript.webp', color: 'slate', animation: 'orbit-c 32s linear infinite', delay: 0.4 },
                                        { id: 'nodejs', logo: '/tecnologias/node.webp', color: 'white', animation: 'orbit-d 26s linear infinite', delay: 0.6 },
                                        { id: 'postgres', logo: '/tecnologias/postgresql.webp', color: 'slate', animation: 'orbit-e 30s linear infinite', delay: 0.8 },
                                        { id: 'php', logo: '/tecnologias/php.webp', color: 'slate', animation: 'orbit-f 35s linear infinite', delay: 1.0 },
                                        { id: 'python', logo: '/tecnologias/python.webp', color: 'slate', animation: 'orbit-g 38s linear infinite', delay: 1.2 },
                                        { id: 'digitalocean', logo: '/tecnologias/digitalocean.webp', color: 'slate', animation: 'orbit-h 22s linear infinite', delay: 1.4 }
                                    ].map((sphere) => {
                                        const position = spherePositions[sphere.id];
                                        const isDragged = draggedSphere === sphere.id;

                                        return (
                                            <div key={sphere.id}>
                                                {/* Trail effect */}
                                                <div
                                                    className={`absolute w-16 h-16 bg-${sphere.color}-500 rounded-full opacity-30 shadow-lg`}
                                                    style={{
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-32px',
                                                        marginLeft: '-32px',
                                                        ...(position && { transform: `translate(${position.x}px, ${position.y}px)` }),
                                                        animation: position ? 'none' : `${sphere.animation}, trail 2s ease-out infinite`,
                                                        transformOrigin: '50% 50%',
                                                        animationDelay: spheresVisible ? `${sphere.delay}s, ${sphere.delay + 0.5}s` : '0s, 0s'
                                                    }}
                                                />

                                                <div
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, sphere.id)}
                                                    onDragEnd={handleDragEnd}
                                                    onMouseEnter={() => setShowTooltip(sphere.id)}
                                                    onMouseLeave={() => setShowTooltip(null)}
                                                    className={`absolute w-16 h-16 bg-${sphere.color}-500 rounded-full opacity-80 shadow-lg draggable orbiting hover:scale-110 transition-transform duration-300 ${isDragged ? 'scale-110 z-10' : ''}`}
                                                    style={{
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-32px',
                                                        marginLeft: '-32px',
                                                        ...(position && { transform: `translate(${position.x}px, ${position.y}px)` }),
                                                        animation: position ? 'none' : sphere.animation,
                                                        transformOrigin: '50% 50%',
                                                        animationDelay: spheresVisible ? `${sphere.delay}s` : '0s'
                                                    }}
                                                >
                                                    <div className={`w-full h-full bg-gradient-to-br from-${sphere.color}-400 to-${sphere.color}-600 rounded-full flex items-center justify-center shadow-inner overflow-hidden hover:shadow-2xl transition-shadow duration-300`}>
                                                        {sphere.logo.includes('.webp') || sphere.logo.includes('.png') || sphere.logo.includes('.jpg') ? (
                                                            <img
                                                                src={sphere.logo}
                                                                alt={`${sphere.id} logo`}
                                                                className="w-12 h-12 object-contain select-none"
                                                                draggable={false}
                                                            />
                                                        ) : (
                                                            <span className="text-white text-2xl select-none">{sphere.logo}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Tooltip */}
                                                {showTooltip === sphere.id && (
                                                    <div
                                                        className="tooltip"
                                                        style={{
                                                            left: position ? `${position.x + 32}px` : '50%',
                                                            top: position ? `${position.y + 32}px` : '50%',
                                                            transform: position ? 'translate(-50%, -100%)' : 'translate(-50%, -100%)'
                                                        }}
                                                    >
                                                        {sphere.id.charAt(0).toUpperCase() + sphere.id.slice(1)}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Decorative elements */}
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Sobre mí Section - After Hero Section */}
                <section id="sobre-mi" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Sobre mí
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Desarrollador especializado en soluciones tecnológicas para PyMEs.
                                Entiendo los desafíos únicos de las pequeñas y medianas empresas.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Mi experiencia con PyMEs
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Con más de 5 años desarrollando soluciones tecnológicas, me especializo en entender
                                    las necesidades reales de las PyMEs. He ayudado a numerosas empresas a digitalizar
                                    sus procesos, optimizar operaciones y aumentar su competitividad en el mercado.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Mi enfoque es práctico: desarrollo soluciones que se adaptan a tu presupuesto,
                                    escalan con tu crecimiento y resuelven problemas concretos de tu negocio.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">50+</div>
                                        <div className="text-gray-600 dark:text-gray-300">Proyectos completados</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600">30+</div>
                                        <div className="text-gray-600 dark:text-gray-300">PyMEs satisfechas</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Tecnologías que domino
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { name: 'React', desc: 'Interfaces modernas y rápidas' },
                                        { name: 'Laravel', desc: 'Backend robusto y escalable' },
                                        { name: 'Node.js', desc: 'APIs y aplicaciones en tiempo real' },
                                        { name: 'TypeScript', desc: 'Código más seguro y mantenible' },
                                        { name: 'Tailwind CSS', desc: 'Diseños responsive profesionales' },
                                        { name: 'PostgreSQL', desc: 'Bases de datos confiables' },
                                        { name: 'AWS', desc: 'Infraestructura cloud' },
                                        { name: 'Docker', desc: 'Despliegues consistentes' }
                                    ].map((tech) => (
                                        <div key={tech.name} className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{tech.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{tech.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Testimonios */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                                Lo que dicen mis clientes
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            MG
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">María González</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Gerente General - Empresa de Distribución</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">
                                        "Claudio transformó completamente nuestra gestión con LunaSuite. Pasamos de hojas de cálculo
                                        caóticas a un sistema profesional que nos da control total. Recomiendo sus servicios a cualquier PyME."
                                    </p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            JP
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Juan Pérez</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Propietario - Ferretería Express</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">
                                        "La tienda online que desarrolló Claudio duplicó nuestras ventas. Ahora vendemos 24/7 y
                                        tenemos clientes de toda la región. Su conocimiento del negocio minorista es invaluable."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Servicios Section */}
                <section id="servicios" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Servicios para tu Empresa
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Soluciones tecnológicas adaptadas a las necesidades de las PyMEs, con enfoque en resultados y eficiencia.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Sistemas ERP y CRM
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Gestiona clientes, pedidos e inventario en una sola plataforma. Automatiza procesos y reduce errores administrativos.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Control de inventarios en tiempo real</li>
                                    <li>• Gestión de clientes y ventas</li>
                                    <li>• Reportes automáticos</li>
                                    <li>• Integración con otras herramientas</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">🛍️</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Tiendas E-commerce
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Vende 24/7 con una tienda online moderna, segura y fácil de usar. Aumenta tus ingresos con comercio electrónico.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Catálogo de productos intuitivo</li>
                                    <li>• Pasarelas de pago seguras</li>
                                    <li>• Gestión de envíos integrada</li>
                                    <li>• Panel de administración completo</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">🌐</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Sitios Web Corporativos
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Presencia digital profesional que genera confianza y atrae nuevos clientes para tu negocio.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Diseño responsive y moderno</li>
                                    <li>• Optimización SEO</li>
                                    <li>• Formularios de contacto</li>
                                    <li>• Integración con redes sociales</li>
                                </ul>
                            </div>
                        </div>

                        {/* ¿Qué puedo desarrollar para tu empresa? */}
                        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                                ¿Qué puedo desarrollar para tu empresa?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Necesitas optimizar tu gestión interna?</strong> Desarrollo sistemas que automatizan procesos administrativos y reducen tiempos operativos.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Quieres vender por Internet?</strong> Creo tiendas e-commerce completas con gestión de productos, pagos y envíos.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Buscas presencia digital profesional?</strong> Diseño sitios web corporativos que generan confianza y atraen clientes.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Tienes una idea específica?</strong> Desarrollo soluciones a medida adaptadas a tu presupuesto y necesidades.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portafolio Section */}
                <section id="portafolio" className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Portafolio de Proyectos
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Casos de éxito que demuestran cómo mis soluciones tecnológicas han impulsado el crecimiento de empresas como la tuya.
                            </p>
                        </div>

                        {/* Proyecto destacado: LunaSuite */}
                        <div className="mb-16">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                                <div className="md:flex">
                                    <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
                                        <div className="text-6xl mb-4">🚀</div>
                                        <h3 className="text-3xl font-bold mb-4">LunaSuite</h3>
                                        <p className="text-blue-100 mb-6">
                                            Sistema de Gestión Empresarial completo
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Gestión de clientes y pedidos</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Control de inventario en tiempo real</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Reportes y análisis automáticos</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Interfaz intuitiva y moderna</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 p-8">
                                        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                            Caso de Éxito
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            Desarrollé LunaSuite para una empresa de distribución que necesitaba digitalizar sus procesos.
                                            Anteriormente manejaban todo en hojas de cálculo, lo que generaba errores y pérdida de tiempo.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-blue-600">50%</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">Reducción en tiempos de reporte</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-green-600">30%</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">Aumento en eficiencia administrativa</div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                            <p className="text-sm italic text-gray-700 dark:text-gray-300">
                                                "LunaSuite transformó completamente nuestra gestión. Ahora tenemos control total de nuestros procesos
                                                y hemos reducido significativamente los errores administrativos."
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                                                - María González, Gerente General
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Otros proyectos */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">🛒</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Tienda Online - Ferretería Express
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        E-commerce completo con catálogo de productos, carrito de compras y sistema de pagos integrado.
                                        La tienda aumentó las ventas online en un 200% en los primeros 6 meses.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            React
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm dark:bg-orange-900 dark:text-orange-200">
                                            Laravel
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900 dark:text-green-200">
                                            Stripe
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">🏢</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Sistema de Gestión - Consultora ABC
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Software a medida para gestión de proyectos, clientes y facturación.
                                        Automatizó procesos que antes tomaban 4 horas diarias, liberando tiempo para actividades estratégicas.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            Vue.js
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm dark:bg-orange-900 dark:text-orange-200">
                                            Laravel
                                        </span>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm dark:bg-yellow-900 dark:text-yellow-200">
                                            MySQL
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-indigo-400 to-cyan-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">📱</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Sitio Web Corporativo - TechSolutions
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Sitio web responsive con diseño moderno, optimización SEO y formulario de contacto.
                                        Aumentó las consultas comerciales en un 150% gracias a mejor presencia digital.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            React
                                        </span>
                                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm dark:bg-cyan-900 dark:text-cyan-200">
                                            Tailwind
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm dark:bg-purple-900 dark:text-purple-200">
                                            Next.js
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contacto Section */}
                <section id="contacto" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                ¿Listo para impulsar tu empresa?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Conversemos sobre tu proyecto. Te ayudo a identificar las mejores soluciones tecnológicas para tu negocio.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Información de Contacto
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                                            <div className="text-gray-600 dark:text-gray-300">claudio@claudioaguilera.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Teléfono</div>
                                            <div className="text-gray-600 dark:text-gray-300">+56 9 1234 5678</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Ubicación</div>
                                            <div className="text-gray-600 dark:text-gray-300">Santiago, Chile</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        ¿Por qué trabajar conmigo?
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            Enfoque especializado en PyMEs
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            Soluciones adaptadas a tu presupuesto
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            Soporte técnico continuo
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            Entrega en tiempo y forma
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Envíame un mensaje
                                </h3>
                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                            placeholder="tu@empresa.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Empresa
                                        </label>
                                        <input
                                            type="text"
                                            id="empresa"
                                            name="empresa"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                            placeholder="Nombre de tu empresa"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Mensaje
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            name="mensaje"
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                            placeholder="Cuéntame sobre tu proyecto..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Enviar Mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold mb-4">Claudio Aguilera</h3>
                            <p className="text-gray-400 mb-4">
                                Desarrollador Full-Stack apasionado por crear soluciones digitales innovadoras
                                y experiencias de usuario excepcionales.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://github.com/claudioaguilera" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/claudioaguilera" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
                            <ul className="space-y-2">
                                <li><Link href="#hero" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
                                <li><Link href="#sobre-mi" className="text-gray-400 hover:text-white transition-colors">Sobre mí</Link></li>
                                <li><Link href="#servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</Link></li>
                                <li><Link href="#portafolio" className="text-gray-400 hover:text-white transition-colors">Portafolio</Link></li>
                                <li><Link href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Tecnologías</h4>
                            <ul className="space-y-2">
                                <li><span className="text-gray-400">React</span></li>
                                <li><span className="text-gray-400">Laravel</span></li>
                                <li><span className="text-gray-400">TypeScript</span></li>
                                <li><span className="text-gray-400">Node.js</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2024 Claudio Aguilera. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}