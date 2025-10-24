import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Code, Cog, Database, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Sun, Moon, CheckCircle, Star } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

// Add custom CSS for Saturn-like orbiting animation and space effects
const orbitStyles = `
@keyframes orbit-a {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(160px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(160px) rotate(-360deg); }
}

@keyframes orbit-b {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(175px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(175px) rotate(360deg); }
}

@keyframes orbit-c {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(190px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(190px) rotate(-360deg); }
}

@keyframes orbit-d {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(205px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(205px) rotate(360deg); }
}

@keyframes orbit-e {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(220px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(220px) rotate(-360deg); }
}

@keyframes orbit-f {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(235px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(235px) rotate(360deg); }
}

@keyframes orbit-g {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg); }
}

@keyframes orbit-h {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(265px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(265px) rotate(360deg); }
}

@keyframes trail {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.5); }
}

.draggable {
  cursor: grab;
  user-select: none;
}

.draggable:active {
  cursor: grabbing;
}

.orbiting {
  pointer-events: auto;
}

/* Space background effects */
.stars-small {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent),
    radial-gradient(1px 1px at 90px 40px, #eee, transparent),
    radial-gradient(1px 1px at 130px 80px, #fff, transparent),
    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 4s ease-in-out infinite alternate;
}

.stars-medium {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(3px 3px at 60px 20px, #fff, transparent),
    radial-gradient(2px 2px at 100px 60px, #eee, transparent),
    radial-gradient(3px 3px at 180px 90px, #ddd, transparent);
  background-repeat: repeat;
  background-size: 300px 150px;
  animation: twinkle 6s ease-in-out infinite alternate-reverse;
}

.stars-large {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(4px 4px at 80px 50px, #fff, transparent),
    radial-gradient(3px 3px at 150px 25px, #eee, transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  animation: twinkle 8s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes aurora {
  0% { transform: translateX(-100%) skewX(-15deg); }
  50% { transform: translateX(100%) skewX(15deg); }
  100% { transform: translateX(-100%) skewX(-15deg); }
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

@keyframes logo-entrance {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes spheres-entrance {
  0% { opacity: 0; transform: scale(0.5) rotate(-180deg); }
  50% { opacity: 0.7; transform: scale(1.2) rotate(0deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.aurora-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
    transparent 30%,
    rgba(147, 51, 234, 0.1) 50%,
    transparent 70%);
  animation: aurora 8s ease-in-out infinite;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
}

.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -10px;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.ripple-effect {
  position: relative;
  overflow: hidden;
}

.ripple-effect::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple-effect:active::before {
  width: 300px;
  height: 300px;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = orbitStyles;
  document.head.appendChild(styleSheet);
}

export default function HomePage() {
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
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [spheresVisible, setSpheresVisible] = useState(false);
    const [budgetForm, setBudgetForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    // Scroll to top on mount to ensure hero section is visible
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const taglines = [
        'Impulso tu negocio con tecnología simple, eficiente y escalable.',
        
    ];

    // Mouse tracking for particles (disabled)
    // const handleMouseMove = useCallback((e: MouseEvent) => {
    //     if (heroRef.current) {
    //         const rect = heroRef.current.getBoundingClientRect();
    //         setMousePosition({
    //             x: e.clientX - rect.left,
    //             y: e.clientY - rect.top
    //         });
    //     }
    // }, []);

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

                // Mouse attraction (only for particles, not stars)
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
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        // Mouse move listener (disabled)
        // document.addEventListener('mousemove', handleMouseMove);
        // return () => document.removeEventListener('mousemove', handleMouseMove);
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

    const handleBudgetFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Budget form submitted:', budgetForm);
        alert('¡Gracias! Tu solicitud de presupuesto ha sido enviada. Me pondré en contacto contigo pronto.');
        setShowBudgetModal(false);
        setBudgetForm({
            name: '',
            email: '',
            company: '',
            phone: '',
            projectType: '',
            budget: '',
            timeline: '',
            description: ''
        });
    };

    const handleBudgetFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setBudgetForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <MainLayout>
            {/* Hero Section - Main Section */}
            <section id="hero" ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white min-h-screen flex items-center">
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
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
                                    {typewriterText}<span className="animate-pulse">|</span>
                                </h1>
                                <h2 className="text-xl md:text-2xl font-light mb-6 text-slate-300 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                                    Desarrollo Full-Stack para PyMEs
                                </h2>
                                <p className={`text-lg md:text-xl text-slate-400 leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ minHeight: '1.5em', display: 'block' }}>
                                    {taglines[taglineIndex]}
                                </p>
                            </div>

                            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <Link
                                    href="#servicios"
                                    className="ripple-effect inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-300 group shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                >
                                    Ver Servicios
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#contacto"
                                    className="ripple-effect inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-2xl hover:bg-slate-700 hover:text-white transition-all duration-300 shadow-xl/20 hover:shadow-2xl hover:scale-105"
                                >
                                    Solicitar presupuesto
                                </Link>
                            </div>
                        </div>

                        <div className="relative" ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div className={`w-96 h-96 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                                <img
                                    src="/claudioaguilera.jpg"
                                    alt="Claudio Aguilera - Desarrollador Full Stack"
                                    className="w-72 h-72 object-cover rounded-full border-4 border-white/20 shadow-2xl logo-entrance"
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
                                            <div>
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

                {/* Parallax wave decoration */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
                    <svg viewBox="0 0 1440 120" className="w-full h-16 fill-slate-50 dark:fill-slate-900">
                        <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                    </svg>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/56954277834?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                aria-label="Contactar por WhatsApp"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    ¡Hablemos por WhatsApp!
                </span>
            </a>

            {/* Servicios Section */}
            <section id="servicios" className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight mb-4">
                            Servicios Especializados
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Soluciones tecnológicas adaptadas a las necesidades reales de tu empresa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Code className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Desarrollo Web Profesional
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Sitios web modernos, rápidos y optimizados para conversiones y SEO.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Sitios rápidos y responsivos
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Optimización SEO técnica
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    UI moderna e intuitiva
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Cog className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Automatización de Procesos
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Elimina tareas repetitivas y optimiza flujos de trabajo empresariales.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Flujos sin papel
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Integraciones API
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Reportes automáticos
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Database className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Sistemas ERP/CRM a Medida
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Gestiona clientes, inventarios y operaciones con sistemas personalizados.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Módulos a medida
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Inventario y ventas
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Multi-sucursal
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Plataformas SaaS
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Como LunaSuite: soluciones cloud escalables para múltiples usuarios.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Gestión integral
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Altamente escalable
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Multi-tenant
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini Quiz Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight mb-4">
                            ¿Qué necesitas para tu empresa?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Responde 3 preguntas rápidas y te recomendamos la solución ideal
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-xl/20 border border-slate-200/50 dark:border-slate-700/50">
                        {!showRecommendation ? (
                            <div className="space-y-8">
                                {quizStep === 0 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿En qué industria está tu empresa?
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                                            {['Retail', 'Servicios', 'Manufactura', 'Otro'].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleQuizAnswer('industry', option.toLowerCase())}
                                                    className="p-4 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {quizStep === 1 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿Cuál es tu objetivo principal?
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                                            {[
                                                { label: 'Digitalizar procesos', value: 'digitalizar' },
                                                { label: 'Automatizar tareas', value: 'automatizar' },
                                                { label: 'Vender online', value: 'vender' },
                                                { label: 'Mejorar análisis', value: 'analizar' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleQuizAnswer('goal', option.value)}
                                                    className="p-4 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {quizStep === 2 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿Cuál es tu urgencia?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            {[
                                                { label: 'Alta - Necesito ya', value: 'alta' },
                                                { label: 'Media - En 3-6 meses', value: 'media' },
                                                { label: 'Baja - Planeando futuro', value: 'baja' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleQuizAnswer('urgency', option.value)}
                                                    className="px-6 py-3 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-6">
                                    <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-2">
                                        ¡Recomendación personalizada!
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        Basado en tus respuestas, te recomendamos:
                                    </p>
                                </div>

                                <div className="bg-indigo-500 text-white rounded-2xl p-6 mb-8">
                                    <h4 className="text-xl font-bold mb-2">{getRecommendation()}</h4>
                                    <p className="text-indigo-100">
                                        Esta solución se adapta perfectamente a tus necesidades de {quizAnswers.industry} con urgencia {quizAnswers.urgency}.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowBudgetModal(true)}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors group shadow-lg"
                                >
                                    Solicitar presupuesto personalizado
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>



            {/* CTA Final Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                        ¿Listo para digitalizar tu empresa?
                    </h2>
                    <p className="text-xl text-indigo-100 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Transforma tu negocio con soluciones tecnológicas a medida.
                        Desde LunaSuite hasta sistemas personalizados, te ayudo a crecer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#contacto"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors group shadow-xl/20"
                        >
                            Solicitar presupuesto
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="https://wa.me/56912345678?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-indigo-600 transition-colors shadow-xl/20"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Budget Modal */}
            {showBudgetModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-t-2xl"></div>
                            <div className="relative">
                                <h2 className="text-2xl font-bold mb-2">Solicitar Presupuesto Personalizado</h2>
                                <p className="text-indigo-100">Cuéntame sobre tu proyecto y te ayudo a hacerlo realidad</p>
                            </div>
                            <button
                                onClick={() => setShowBudgetModal(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleBudgetFormSubmit} className="p-6 space-y-6">
                            {/* Personal Information */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={budgetForm.name}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={budgetForm.email}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={budgetForm.company}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Nombre de tu empresa"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={budgetForm.phone}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="+56 9 1234 5678"
                                    />
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tipo de proyecto *
                                    </label>
                                    <select
                                        name="projectType"
                                        required
                                        value={budgetForm.projectType}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="web">Sitio Web Corporativo</option>
                                        <option value="ecommerce">Tienda E-commerce</option>
                                        <option value="erp">Sistema ERP/CRM</option>
                                        <option value="app">Aplicación Móvil/Web</option>
                                        <option value="automation">Automatización de Procesos</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Presupuesto aproximado
                                    </label>
                                    <select
                                        name="budget"
                                        value={budgetForm.budget}
                                        onChange={handleBudgetFormChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                    >
                                        <option value="">Selecciona un rango</option>
                                        <option value="small">Hasta $1.000.000</option>
                                        <option value="medium">$1.000.000 - $3.000.000</option>
                                        <option value="large">$3.000.000 - $5.000.000</option>
                                        <option value="enterprise">Más de $5.000.000</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Plazo deseado
                                </label>
                                <select
                                    name="timeline"
                                    value={budgetForm.timeline}
                                    onChange={handleBudgetFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                >
                                    <option value="">Selecciona un plazo</option>
                                    <option value="urgent">Urgente (1-2 semanas)</option>
                                    <option value="quick">Rápido (1 mes)</option>
                                    <option value="normal">Normal (2-3 meses)</option>
                                    <option value="relaxed">Sin prisa (3+ meses)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Descripción del proyecto *
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    value={budgetForm.description}
                                    onChange={handleBudgetFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                                    placeholder="Cuéntame sobre tu proyecto, objetivos, funcionalidades requeridas, etc."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowBudgetModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}