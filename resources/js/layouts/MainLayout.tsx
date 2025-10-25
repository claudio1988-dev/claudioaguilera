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
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; driftX?: number; driftY?: number }>>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);
    const [spheresVisible, setSpheresVisible] = useState(false);
    const [showAchievementPanel, setShowAchievementPanel] = useState(false);
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);
    const [showProgressBars, setShowProgressBars] = useState(false);
    const [showLiveStats, setShowLiveStats] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [countUpValues, setCountUpValues] = useState({ sales: 0, time: 0, satisfaction: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    const taglines = [
        'Impulso tu negocio con tecnología eficiente y escalable.',
       
    ];

    // Mouse tracking removed - particles now move autonomously

    // Particle system
    useEffect(() => {
        const createParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                // Add some variation to make movement more interesting
                driftX: Math.sin(i * 0.1) * 0.02,
                driftY: Math.cos(i * 0.1) * 0.02
            }));
            setParticles(newParticles);
        };

        const updateParticles = () => {
            setParticles(prev => prev.map(particle => {
                let newX = particle.x + particle.vx + (particle.driftX || 0);
                let newY = particle.y + particle.vy + (particle.driftY || 0);

                // Boundary checks with bounce
                if (newX < 0 || newX > window.innerWidth) {
                    particle.vx *= -0.8; // Slight energy loss on bounce
                    newX = Math.max(0, Math.min(window.innerWidth, newX));
                }
                if (newY < 0 || newY > window.innerHeight) {
                    particle.vy *= -0.8; // Slight energy loss on bounce
                    newY = Math.max(0, Math.min(window.innerHeight, newY));
                }

                // Add subtle random drift to keep movement interesting
                particle.vx += (Math.random() - 0.5) * 0.01;
                particle.vy += (Math.random() - 0.5) * 0.01;

                // Limit velocity to prevent particles from moving too fast
                particle.vx = Math.max(-1, Math.min(1, particle.vx));
                particle.vy = Math.max(-1, Math.min(1, particle.vy));

                return {
                    ...particle,
                    x: newX,
                    y: newY
                };
            }));
        };

        createParticles();
        const interval = setInterval(updateParticles, 16); // ~60fps

        return () => clearInterval(interval);
    }, []); // Removed mousePosition dependency

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
                // Show progress bars after spheres appear
                setTimeout(() => setShowProgressBars(true), 3000);
                // Show floating CTA after spheres appear
                setTimeout(() => setShowFloatingCTA(true), 4000);
                // Show live stats after CTA
                setTimeout(() => setShowLiveStats(true), 5000);
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

    // Count-up animation for stats
    useEffect(() => {
        if (showProgressBars) {
            const duration = 2000; // 2 seconds
            const steps = 60; // 60 fps
            const increment = duration / steps;

            let currentStep = 0;
            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                setCountUpValues({
                    sales: Math.floor(200 * easeOutQuart),
                    time: Math.floor(50 * easeOutQuart),
                    satisfaction: Math.floor(95 * easeOutQuart)
                });

                if (currentStep >= steps) {
                    clearInterval(timer);
                    // Ensure final values are exact
                    setCountUpValues({ sales: 200, time: 50, satisfaction: 95 });
                }
            }, increment);

            return () => clearInterval(timer);
        }
    }, [showProgressBars]);

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

        // Mouse tracking removed - particles move autonomously
    }, []);

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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#01D0FF]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/logoclaudioaguilera.png"
                                    alt="Claudio Aguilera Logo"
                                    className="h-16 w-64 object-contain"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="#hero"
                                className="text-[#FEFEFF] hover:text-[#01D0FF] transition-colors cursor-pointer"
                            >
                                Inicio
                            </a>
                            <a
                                href="#sobre-mi"
                                className="text-[#FEFEFF] hover:text-[#01D0FF] transition-colors cursor-pointer"
                            >
                                Sobre mí
                            </a>
                            <a
                                href="#servicios"
                                className="text-[#FEFEFF] hover:text-[#01D0FF] transition-colors cursor-pointer"
                            >
                                Servicios
                            </a>
                            <a
                                href="#portafolio"
                                className="text-[#FEFEFF] hover:text-[#01D0FF] transition-colors cursor-pointer"
                            >
                                Portafolio
                            </a>
                            <a
                                href="#contacto"
                                className="bg-[#01D0FF] text-[#000100] px-4 py-2 rounded-md hover:bg-[#01D0FF]/80 transition-colors cursor-pointer font-semibold"
                            >
                                Contacto
                            </a>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-[#e5e5e5] hover:text-[#fca311] focus:outline-none focus:text-[#fca311] transition-colors"
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className={`h-6 w-6 fill-current transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                                    ) : (
                                        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu - collapsible */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-[#01D0FF]/10">
                        <a
                            href="#hero"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-[#FEFEFF] hover:text-[#01D0FF] cursor-pointer rounded-md hover:bg-[#01D0FF]/10 transition-colors"
                        >
                            Inicio
                        </a>
                        <a
                            href="#sobre-mi"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-[#FEFEFF] hover:text-[#01D0FF] cursor-pointer rounded-md hover:bg-[#01D0FF]/10 transition-colors"
                        >
                            Sobre mí
                        </a>
                        <a
                            href="#servicios"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-[#FEFEFF] hover:text-[#01D0FF] cursor-pointer rounded-md hover:bg-[#01D0FF]/10 transition-colors"
                        >
                            Servicios
                        </a>
                        <a
                            href="#portafolio"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-base font-medium text-[#FEFEFF] hover:text-[#01D0FF] cursor-pointer rounded-md hover:bg-[#01D0FF]/10 transition-colors"
                        >
                            Portafolio
                        </a>
                        <a
                            href="#contacto"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-base font-medium bg-[#01D0FF] text-[#000100] rounded-md cursor-pointer font-semibold hover:bg-[#01D0FF]/80 transition-colors"
                        >
                            Contacto
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 pt-16">
                {/* Hero Section - Space Module */}
                <section id="hero" ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-[#000100] via-[#0065E1] to-[#0085EE] text-white min-h-[70vh] flex items-center justify-center">
                    {/* Aurora effect on edges */}
                    <div className="aurora-effect"></div>
    
                    {/* Space background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#000100]/50 via-[#0065E1]/30 to-[#0085EE]/50"></div>

                    {/* Stars effect */}
                    <div className="absolute inset-0">
                        <div className="stars-small"></div>
                        <div className="stars-medium"></div>
                        <div className="stars-large"></div>
                    </div>

                    {/* Nebula effect */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fca311]/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#14213d]/5 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fca311]/3 rounded-full blur-2xl"></div>
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

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                        {/* Top Stats Row */}
                        <div className="flex justify-center items-start mb-8">
                            {/* Welcome Message */}
                            <div className={`transition-all duration-500 transform ${showProgressBars ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                                <div className="bg-gradient-to-r from-[#fca311] to-[#e76f51] text-white px-4 py-2 rounded-full shadow-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-sm">✨</div>
                                        <span className="text-sm font-medium">¡Bienvenido! Transformemos tu negocio juntos</span>
                                        <div className="text-sm">🚀</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-8 items-center">
                            {/* Left Column - Text Content */}
                            <div className="lg:col-span-1 space-y-6">
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
                                        className="ripple-effect inline-flex items-center justify-center px-6 py-3 bg-[#01D0FF] text-[#000100] font-semibold rounded-xl hover:bg-[#01D0FF]/80 transition-all duration-300 group shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                    >
                                        Ver Servicios
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="#contacto"
                                        className="ripple-effect inline-flex items-center justify-center px-6 py-3 border-2 border-[#01D0FF] text-[#01D0FF] font-semibold rounded-xl hover:bg-[#01D0FF] hover:text-[#000100] transition-all duration-300 shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                    >
                                        Solicitar presupuesto
                                    </Link>
                                </div>
                            </div>

                            {/* Center Column - Profile Image */}
                            <div className="lg:col-span-1 flex justify-center" ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <div className="relative">
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
                                                    onMouseEnter={() => {
                                                        setShowTooltip(sphere.id);
                                                        setShowAchievementPanel(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setShowTooltip(null);
                                                        setShowAchievementPanel(false);
                                                    }}
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

                        {/* Right Column - Contact Form */}
                        <div className="lg:col-span-1">
                            <div className={`transition-all duration-1000 delay-1000 ${showProgressBars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-xl font-bold text-white mb-4 text-center">¿Hablamos de tu proyecto?</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Tu nombre"
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="tu@email.com"
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                rows={3}
                                                placeholder="Cuéntame sobre tu proyecto..."
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent resize-none"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#01D0FF] text-[#000100] py-2 px-4 rounded-lg font-semibold hover:bg-[#01D0FF]/80 transition-colors"
                                        >
                                            Enviar mensaje
                                        </button>
                                    </form>
                                </div>
                            </div>
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
                <section id="sobre-mi" className="py-20 bg-gradient-to-br from-[#000100] via-[#001122] to-[#000100] relative overflow-hidden">
                    {/* Dynamic background effects */}
                    <div className="absolute inset-0">
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(1, 208, 255, 0.3) 1px, transparent 0)`,
                                backgroundSize: '50px 50px'
                            }}></div>
                        </div>

                        {/* Floating geometric shapes */}
                        <div className="absolute top-20 left-20 w-32 h-32 border border-[#01D0FF]/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                        <div className="absolute bottom-32 right-16 w-24 h-24 border border-[#0085EE]/20 rotate-45 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#01D0FF]/10 rounded-lg animate-bounce" style={{ animationDuration: '3s' }}></div>

                        {/* Nebula effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#01D0FF]/5 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0085EE]/5 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-full mb-6 shadow-lg animate-pulse">
                                <span className="text-2xl">👨‍💻</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Sobre mí
                            </h2>
                            <p className="text-lg text-[#E0F2FE] max-w-3xl mx-auto leading-relaxed">
                                Desarrollador especializado en soluciones tecnológicas para PyMEs.
                                Entiendo los desafíos únicos de las pequeñas y medianas empresas.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Left Column - Experience */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#01D0FF]/10 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform">
                                            <span className="text-white text-lg">🚀</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            Mi experiencia
                                        </h3>
                                    </div>
                                    <p className="text-[#E0F2FE] text-sm leading-relaxed mb-4">
                                        Con más de 10 años desarrollando soluciones tecnológicas, me especializo en entender
                                        las necesidades reales de las PyMEs.
                                    </p>
                                    <div className="bg-gradient-to-br from-[#01D0FF]/10 to-[#0085EE]/10 rounded-lg p-3 border border-[#01D0FF]/20">
                                        <div className="text-2xl font-bold text-[#01D0FF] mb-1">50+</div>
                                        <div className="text-xs text-[#E0F2FE] font-medium">Proyectos completados</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#01D0FF]/10 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#0065E1] to-[#01D0FF] rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform">
                                            <span className="text-white text-lg">🎯</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            Mi enfoque
                                        </h3>
                                    </div>
                                    <p className="text-[#E0F2FE] text-sm leading-relaxed mb-4">
                                        Desarrollo soluciones que se adaptan a tu presupuesto,
                                        escalan con tu crecimiento y resuelven problemas concretos.
                                    </p>
                                    <div className="bg-gradient-to-br from-[#0065E1]/10 to-[#01D0FF]/10 rounded-lg p-3 border border-[#0065E1]/20">
                                        <div className="text-2xl font-bold text-[#0065E1] mb-1">30+</div>
                                        <div className="text-xs text-[#E0F2FE] font-medium">PyMEs satisfechas</div>
                                    </div>
                                </div>
                            </div>

                            {/* Center Column - Philosophy & Values */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-2xl p-6 text-white shadow-xl">
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl mr-3">💡</span>
                                        <h3 className="text-xl font-bold text-white">
                                            Mi filosofía
                                        </h3>
                                    </div>
                                    <p className="text-[#E0F2FE] text-sm leading-relaxed mb-4">
                                        Creo en el poder de la tecnología para transformar negocios. Cada proyecto es una oportunidad
                                        para crear soluciones que no solo funcionen, sino que impulsen el crecimiento sostenible.
                                    </p>
                                    <div className="flex items-center text-xs text-[#E0F2FE]/80">
                                        <div className="w-1.5 h-1.5 bg-[#01D0FF] rounded-full mr-2"></div>
                                        Resultados medibles y ROI claro
                                    </div>
                                    <div className="flex items-center text-xs text-[#E0F2FE]/80">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                                        Resultados medibles y ROI claro
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#01D0FF]/10">
                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                        <span className="text-xl mr-2">🎯</span>
                                        Valores que me guían
                                    </h4>
                                    <div className="space-y-3">
                                        {[
                                            { icon: '🤝', text: 'Transparencia total' },
                                            { icon: '⚡', text: 'Entregas rápidas' },
                                            { icon: '📈', text: 'Resultados medibles' },
                                            { icon: '🔄', text: 'Soporte continuo' }
                                        ].map((value, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <span className="mr-3 text-lg">{value.icon}</span>
                                                <span className="text-[#E0F2FE]">{value.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Technologies */}
                            <div className="space-y-6">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#0065E1] to-[#01D0FF] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                                            <span className="text-white text-lg">⚡</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">
                                            Tecnologías que domino
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { name: 'React', icon: '⚛️' },
                                            { name: 'Laravel', icon: '🎯' },
                                            { name: 'Node.js', icon: '🟢' },
                                            { name: 'TypeScript', icon: '🔷' },
                                            { name: 'Tailwind', icon: '🎨' },
                                            { name: 'PostgreSQL', icon: '🐘' },
                                            { name: 'AWS', icon: '☁️' },
                                            { name: 'Docker', icon: '🐳' }
                                        ].map((tech) => (
                                            <div key={tech.name} className="flex items-center p-2 rounded-lg hover:bg-[#01D0FF]/5 transition-colors group cursor-pointer">
                                                <span className="mr-2 text-lg group-hover:scale-110 transition-transform">{tech.icon}</span>
                                                <span className="text-xs font-medium text-white group-hover:text-[#01D0FF] transition-colors">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills Progress Bars */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center">
                                        <span className="text-lg mr-2">📈</span>
                                        Nivel de expertise
                                    </h4>
                                    <div className="space-y-3">
                                        {[
                                            { skill: 'Frontend', level: 95 },
                                            { skill: 'Backend', level: 90 },
                                            { skill: 'Arquitectura', level: 85 },
                                            { skill: 'DevOps', level: 80 }
                                        ].map((item) => (
                                            <div key={item.skill}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-white font-medium">{item.skill}</span>
                                                    <span className="text-[#01D0FF] font-semibold">{item.level}%</span>
                                                </div>
                                                <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
                                                    <div
                                                        className="bg-gradient-to-r from-[#01D0FF] to-[#0085EE] h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${item.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonios */}
                        <div className="mt-16">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-full mb-4 shadow-lg">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Lo que dicen mis clientes
                                </h3>
                                <p className="text-[#E0F2FE] max-w-2xl mx-auto">
                                    Historias reales de transformación digital que he ayudado a crear
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Testimonial 1 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="flex items-start mb-4">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-[#01D0FF] shadow-lg group-hover:scale-110 transition-transform">
                                                <img
                                                    src="/tecnologias/personas/javiera.png"
                                                    alt="Javiera - Ascolor"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#01D0FF] rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center mb-1">
                                                <h4 className="font-bold text-white text-lg">Javiera</h4>
                                                <div className="ml-2 flex text-yellow-400">
                                                    {'★★★★★'.split('').map((star, i) => (
                                                        <span key={i} className="text-sm">{star}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#E0F2FE] font-medium">Ascolor - Diseño Publicitario y Producción en Artes Gráficas</p>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs text-[#01D0FF] font-semibold">Cliente desde 2023</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="text-[#01D0FF] text-4xl font-serif absolute -top-2 -left-2 opacity-20">"</div>
                                        <p className="text-[#374151] italic leading-relaxed pl-4">
                                            "Claudio transformó completamente nuestra gestión con LunaSuite. Ahora utilizamos el sistema para gestionar clientes, cotizaciones, pedidos, órdenes de trabajo y seguimiento de pedidos de forma profesional y eficiente."
                                        </p>
                                        <div className="text-[#01D0FF] text-4xl font-serif absolute -bottom-4 right-0 opacity-20">"</div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center text-xs text-[#6B7280]">
                                            <span className="mr-2">🏆</span>
                                            <span>Proyecto destacado: LunaSuite ERP</span>
                                        </div>
                                        <div className="text-xs text-[#01D0FF] font-semibold">Ver caso completo →</div>
                                    </div>
                                </div>

                                {/* Testimonial 2 */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="flex items-start mb-4">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-[#0065E1] shadow-lg group-hover:scale-110 transition-transform">
                                                <img
                                                    src="/tecnologias/personas/esteban.png"
                                                    alt="Esteban Ortega - Omnature"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0065E1] rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center mb-1">
                                                <h4 className="font-bold text-[#000100] text-lg">Esteban Ortega</h4>
                                                <div className="ml-2 flex text-yellow-400">
                                                    {'★★★★★'.split('').map((star, i) => (
                                                        <span key={i} className="text-sm">{star}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#6B7280] font-medium">Omnature - Agua Purificada</p>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs text-[#0065E1] font-semibold">Cliente desde 2022</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="text-[#0065E1] text-4xl font-serif absolute -top-2 -left-2 opacity-20">"</div>
                                        <p className="text-[#374151] italic leading-relaxed pl-4">
                                            "La tienda online que desarrolló Claudio duplicó nuestras ventas. Ahora vendemos 24/7 y
                                            tenemos clientes de toda la región. Su conocimiento del negocio minorista es invaluable."
                                        </p>
                                        <div className="text-[#0065E1] text-4xl font-serif absolute -bottom-4 right-0 opacity-20">"</div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center text-xs text-[#6B7280]">
                                            <span className="mr-2">🚀</span>
                                            <span>Resultado: +200% ventas online</span>
                                        </div>
                                        <div className="text-xs text-[#0065E1] font-semibold">Ver caso completo →</div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center mt-12">
                                <div className="bg-gradient-to-r from-[#01D0FF]/10 to-[#0085EE]/10 rounded-2xl p-6 border border-[#01D0FF]/20">
                                    <h4 className="text-lg font-bold text-[#000100] mb-2">¿Quieres ser el próximo caso de éxito?</h4>
                                    <p className="text-[#6B7280] mb-4">Únete a más de 30 empresas que han transformado su negocio con mis soluciones</p>
                                    <Link
                                        href="#contacto"
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group"
                                    >
                                        Comienza tu transformación
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Servicios Section */}
                <section id="servicios" className="py-20 bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-3">
                        <div className="absolute top-10 right-10 w-40 h-40 bg-[#01D0FF] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#0085EE] rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-full mb-6 shadow-lg">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#000100] mb-4">
                                Servicios para tu Empresa
                            </h2>
                            <p className="text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
                                Soluciones tecnológicas adaptadas a las necesidades de las PyMEs, con enfoque en resultados y eficiencia.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                            {/* Servicio 1 - ERP/CRM */}
                            <div className="group bg-white rounded-2xl p-8 shadow-xl border border-[#01D0FF]/10 hover:shadow-2xl hover:border-[#01D0FF]/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-[#6B7280] font-medium">Desde</div>
                                        <div className="text-lg font-bold text-[#01D0FF]">$2.500.000</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#000100] mb-3 group-hover:text-[#01D0FF] transition-colors">
                                    Sistemas ERP y CRM
                                </h3>
                                <p className="text-[#6B7280] mb-6 leading-relaxed">
                                    Gestiona clientes, pedidos e inventario en una sola plataforma. Automatiza procesos y reduce errores administrativos.
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[
                                        { icon: '📦', text: 'Control de inventarios en tiempo real' },
                                        { icon: '👥', text: 'Gestión de clientes y ventas' },
                                        { icon: '📈', text: 'Reportes automáticos' },
                                        { icon: '🔗', text: 'Integración con otras herramientas' }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <span className="mr-3 text-lg">{feature.icon}</span>
                                            <span className="text-[#374151]">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-[#6B7280]">
                                        <span className="mr-1">⏱️</span>
                                        <span>2-4 semanas</span>
                                    </div>
                                    <Link
                                        href="#contacto"
                                        className="text-sm font-semibold text-[#01D0FF] hover:text-[#0085EE] transition-colors group-hover:underline"
                                    >
                                        Solicitar cotización →
                                    </Link>
                                </div>
                            </div>

                            {/* Servicio 2 - E-commerce */}
                            <div className="group bg-white rounded-2xl p-8 shadow-xl border border-[#01D0FF]/10 hover:shadow-2xl hover:border-[#01D0FF]/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#0065E1] to-[#01D0FF] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🛍️</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-[#6B7280] font-medium">Desde</div>
                                        <div className="text-lg font-bold text-[#0065E1]">$1.800.000</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#000100] mb-3 group-hover:text-[#0065E1] transition-colors">
                                    Tiendas E-commerce
                                </h3>
                                <p className="text-[#6B7280] mb-6 leading-relaxed">
                                    Vende 24/7 con una tienda online moderna, segura y fácil de usar. Aumenta tus ingresos con comercio electrónico.
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[
                                        { icon: '🛒', text: 'Catálogo de productos intuitivo' },
                                        { icon: '💳', text: 'Pasarelas de pago seguras' },
                                        { icon: '🚚', text: 'Gestión de envíos integrada' },
                                        { icon: '⚙️', text: 'Panel de administración completo' }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <span className="mr-3 text-lg">{feature.icon}</span>
                                            <span className="text-[#374151]">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-[#6B7280]">
                                        <span className="mr-1">⏱️</span>
                                        <span>3-6 semanas</span>
                                    </div>
                                    <Link
                                        href="#contacto"
                                        className="text-sm font-semibold text-[#0065E1] hover:text-[#01D0FF] transition-colors group-hover:underline"
                                    >
                                        Solicitar cotización →
                                    </Link>
                                </div>
                            </div>

                            {/* Servicio 3 - Sitios Web */}
                            <div className="group bg-white rounded-2xl p-8 shadow-xl border border-[#01D0FF]/10 hover:shadow-2xl hover:border-[#01D0FF]/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#0085EE] to-[#0065E1] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🌐</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-[#6B7280] font-medium">Desde</div>
                                        <div className="text-lg font-bold text-[#0085EE]">$800.000</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#000100] mb-3 group-hover:text-[#0085EE] transition-colors">
                                    Sitios Web Corporativos
                                </h3>
                                <p className="text-[#6B7280] mb-6 leading-relaxed">
                                    Presencia digital profesional que genera confianza y atrae nuevos clientes para tu negocio.
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[
                                        { icon: '📱', text: 'Diseño responsive y moderno' },
                                        { icon: '🔍', text: 'Optimización SEO' },
                                        { icon: '📝', text: 'Formularios de contacto' },
                                        { icon: '📱', text: 'Integración con redes sociales' }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <span className="mr-3 text-lg">{feature.icon}</span>
                                            <span className="text-[#374151]">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-[#6B7280]">
                                        <span className="mr-1">⏱️</span>
                                        <span>1-3 semanas</span>
                                    </div>
                                    <Link
                                        href="#contacto"
                                        className="text-sm font-semibold text-[#0085EE] hover:text-[#0065E1] transition-colors group-hover:underline"
                                    >
                                        Solicitar cotización →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Benefits Section */}
                        <div className="mt-16 bg-gradient-to-r from-[#01D0FF]/5 to-[#0085EE]/5 rounded-2xl p-8 border border-[#01D0FF]/10">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-[#000100] mb-2">
                                    ¿Qué puedo desarrollar para tu empresa?
                                </h3>
                                <p className="text-[#6B7280]">Descubre cómo puedo transformar tu negocio</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-[#01D0FF]/20 hover:shadow-xl hover:border-[#01D0FF]/40 transition-all duration-300 cursor-pointer">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <span className="text-xl">⚙️</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#000100] mb-2 group-hover:text-[#01D0FF] transition-colors">
                                                    Gestión Interna Optimizada
                                                </h4>
                                                <p className="text-[#6B7280] text-sm leading-relaxed">
                                                    Desarrollo sistemas que automatizan procesos administrativos y reducen tiempos operativos hasta en un 60%.
                                                </p>
                                                <div className="mt-3 flex items-center text-xs text-[#01D0FF] font-semibold">
                                                    <span>Ver ejemplos de proyectos</span>
                                                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-[#0065E1]/20 hover:shadow-xl hover:border-[#0065E1]/40 transition-all duration-300 cursor-pointer">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#0065E1] to-[#01D0FF] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <span className="text-xl">🛒</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#000100] mb-2 group-hover:text-[#0065E1] transition-colors">
                                                    Comercio Electrónico Completo
                                                </h4>
                                                <p className="text-[#6B7280] text-sm leading-relaxed">
                                                    Creo tiendas e-commerce completas con gestión de productos, pagos seguros y envíos integrados.
                                                </p>
                                                <div className="mt-3 flex items-center text-xs text-[#0065E1] font-semibold">
                                                    <span>Ver tiendas desarrolladas</span>
                                                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-[#0085EE]/20 hover:shadow-xl hover:border-[#0085EE]/40 transition-all duration-300 cursor-pointer">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#0085EE] to-[#0065E1] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <span className="text-xl">🌐</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#000100] mb-2 group-hover:text-[#0085EE] transition-colors">
                                                    Presencia Digital Profesional
                                                </h4>
                                                <p className="text-[#6B7280] text-sm leading-relaxed">
                                                    Diseño sitios web corporativos que generan confianza y atraen nuevos clientes para tu negocio.
                                                </p>
                                                <div className="mt-3 flex items-center text-xs text-[#0085EE] font-semibold">
                                                    <span>Ver portafolio web</span>
                                                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-xl p-6 shadow-lg text-white hover:shadow-xl transition-all duration-300 cursor-pointer">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
                                                <span className="text-xl">💡</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-2">
                                                    Soluciones a Medida
                                                </h4>
                                                <p className="text-[#E0F2FE] text-sm leading-relaxed">
                                                    ¿Tienes una idea específica? Desarrollo soluciones personalizadas adaptadas a tu presupuesto y necesidades únicas.
                                                </p>
                                                <div className="mt-3 flex items-center text-xs font-semibold">
                                                    <span>Contactar para cotización</span>
                                                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="text-center mt-8">
                                <Link
                                    href="#contacto"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group hover:scale-105"
                                >
                                    <span>Comenzar mi proyecto</span>
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
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

                {/* Contacto Section - Ultimate Experience */}
                <section id="contacto" className="py-20 bg-gradient-to-br from-[#000100] via-[#001122] to-[#000100] relative overflow-hidden">
                    {/* Dynamic background effects */}
                    <div className="absolute inset-0">
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(1, 208, 255, 0.3) 1px, transparent 0)`,
                                backgroundSize: '50px 50px'
                            }}></div>
                        </div>

                        {/* Floating geometric shapes */}
                        <div className="absolute top-20 left-20 w-32 h-32 border border-[#01D0FF]/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                        <div className="absolute bottom-32 right-16 w-24 h-24 border border-[#0085EE]/20 rotate-45 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#01D0FF]/10 rounded-lg animate-bounce" style={{ animationDuration: '3s' }}></div>

                        {/* Nebula effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#01D0FF]/5 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0085EE]/5 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        {/* Hero CTA Section */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-full mb-8 shadow-2xl animate-pulse">
                                <span className="text-3xl">🚀</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                ¿Listo para <span className="bg-gradient-to-r from-[#01D0FF] to-[#0085EE] bg-clip-text text-transparent">impulsar</span> tu empresa?
                            </h2>

                            <p className="text-xl text-[#E0F2FE] max-w-4xl mx-auto mb-8 leading-relaxed">
                                Conversemos sobre tu proyecto. Te ayudo a identificar las mejores soluciones tecnológicas
                                para transformar tu negocio y llevarlo al siguiente nivel.
                            </p>

                            {/* Animated stats */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#01D0FF] mb-2">50+</div>
                                    <div className="text-sm text-[#E0F2FE]/80">Proyectos exitosos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#0085EE] mb-2">30+</div>
                                    <div className="text-sm text-[#E0F2FE]/80">Empresas felices</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#0065E1] mb-2">5+</div>
                                    <div className="text-sm text-[#E0F2FE]/80">Años de experiencia</div>
                                </div>
                            </div>

                            {/* Primary CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <Link
                                    href="#contact-form"
                                    className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] text-[#000100] font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0085EE] to-[#01D0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 flex items-center">
                                        <span className="text-lg mr-2">💬</span>
                                        Iniciar conversación
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>

                                <Link
                                    href="https://wa.me/56912345678?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center px-8 py-4 border-2 border-[#01D0FF] text-[#01D0FF] font-bold rounded-2xl hover:bg-[#01D0FF] hover:text-[#000100] transition-all duration-300 hover:scale-105"
                                >
                                    <span className="text-lg mr-2">📱</span>
                                    WhatsApp directo
                                </Link>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-[#E0F2FE]/60">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    Respuesta en menos de 24 horas
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                                    Consultoría inicial gratuita
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                                    Sin compromiso
                                </div>
                            </div>
                        </div>
                        
                        {/* Interactive Contact Experience */}
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Left Column - Contact Info & Benefits */}
                            <div className="space-y-8">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                        <span className="text-2xl mr-3">📞</span>
                                        Información de Contacto
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="group flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg">Email</div>
                                                <div className="text-[#E0F2FE] group-hover:text-[#01D0FF] transition-colors">claudio@claudioaguilera.com</div>
                                            </div>
                                        </div>

                                        <div className="group flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#0085EE] to-[#0065E1] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg">Teléfono</div>
                                                <div className="text-[#E0F2FE] group-hover:text-[#0085EE] transition-colors">+56 9 1234 5678</div>
                                            </div>
                                        </div>

                                        <div className="group flex items-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#0065E1] to-[#01D0FF] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg">Ubicación</div>
                                                <div className="text-[#E0F2FE] group-hover:text-[#0065E1] transition-colors">Santiago, Chile</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Why work with me */}
                                <div className="bg-gradient-to-r from-[#01D0FF]/10 to-[#0085EE]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#01D0FF]/20">
                                    <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                                        <span className="text-2xl mr-3">✨</span>
                                        ¿Por qué trabajar conmigo?
                                    </h4>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { icon: '🎯', title: 'Enfoque especializado', desc: 'PyMEs son mi pasión' },
                                            { icon: '💰', title: 'Presupuesto adaptado', desc: 'Soluciones que caben en tu bolsillo' },
                                            { icon: '🛠️', title: 'Soporte continuo', desc: 'Estoy contigo en cada paso' },
                                            { icon: '⚡', title: 'Entregas rápidas', desc: 'Resultados que importan' }
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-start group">
                                                <div className="w-10 h-10 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                                                    <span className="text-lg">{benefit.icon}</span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white group-hover:text-[#01D0FF] transition-colors">{benefit.title}</div>
                                                    <div className="text-[#E0F2FE]/80 text-sm">{benefit.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Form */}
                            <div id="contact-form" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#01D0FF] to-[#0085EE] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Envíame un mensaje
                                    </h3>
                                    <p className="text-[#E0F2FE]/80">
                                        Cuéntame sobre tu proyecto y comencemos a trabajar juntos
                                    </p>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-semibold text-white mb-2">
                                                Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                required
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                                placeholder="Tu nombre completo"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="empresa" className="block text-sm font-semibold text-white mb-2">
                                                Empresa
                                            </label>
                                            <input
                                                type="text"
                                                id="empresa"
                                                name="empresa"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                                placeholder="Nombre de tu empresa"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            placeholder="tu@empresa.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="servicio" className="block text-sm font-semibold text-white mb-2">
                                            Servicio de interés
                                        </label>
                                        <select
                                            id="servicio"
                                            name="servicio"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        >
                                            <option value="" className="text-gray-900">Selecciona un servicio</option>
                                            <option value="erp" className="text-gray-900">Sistema ERP/CRM</option>
                                            <option value="ecommerce" className="text-gray-900">Tienda E-commerce</option>
                                            <option value="web" className="text-gray-900">Sitio Web Corporativo</option>
                                            <option value="otro" className="text-gray-900">Otro proyecto</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="mensaje" className="block text-sm font-semibold text-white mb-2">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            name="mensaje"
                                            rows={4}
                                            required
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#01D0FF] focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                                            placeholder="Cuéntame sobre tu proyecto, presupuesto aproximado y plazos..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#01D0FF] to-[#0085EE] text-[#000100] py-4 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                                    >
                                        <span className="flex items-center justify-center">
                                            <span className="text-lg mr-2">🚀</span>
                                            Enviar Mensaje
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>

                                    <p className="text-center text-xs text-[#E0F2FE]/60">
                                        * Campos obligatorios • Respuesta en menos de 24 horas
                                    </p>
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