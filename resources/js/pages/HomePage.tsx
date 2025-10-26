import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Code, Cog, Database, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Sun, Moon, CheckCircle, Star } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

// Add custom CSS for Saturn-like orbiting animation and space effects with new color palette
const orbitStyles = `
:root {
  --celtic-blue: #0065E1;
  --bleu-de-france: #0085EE;
  --vivid-sky-blue: #01D0FF;
  --white: #FEFEFF;
  --black: #000100;
}
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
  user-select: none;
}

.draggable:active {
  /* cursor removed */
}

.orbiting {
  pointer-events: auto;
}

/* Space background effects with new colors */
.stars-small {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, var(--vivid-sky-blue), transparent),
    radial-gradient(2px 2px at 40px 70px, var(--white), transparent),
    radial-gradient(1px 1px at 90px 40px, var(--bleu-de-france), transparent),
    radial-gradient(1px 1px at 130px 80px, var(--white), transparent),
    radial-gradient(2px 2px at 160px 30px, var(--celtic-blue), transparent);
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
    radial-gradient(3px 3px at 60px 20px, var(--white), transparent),
    radial-gradient(2px 2px at 100px 60px, var(--vivid-sky-blue), transparent),
    radial-gradient(3px 3px at 180px 90px, var(--bleu-de-france), transparent);
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
    radial-gradient(4px 4px at 80px 50px, var(--white), transparent),
    radial-gradient(3px 3px at 150px 25px, var(--vivid-sky-blue), transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  animation: twinkle 8s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.9; }
  100% { opacity: 1; }
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
  background: var(--vivid-sky-blue);
  border-radius: 50%;
  pointer-events: none;
}

.tooltip {
  position: absolute;
  background: var(--black);
  color: var(--white);
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
  border-top-color: var(--black);
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
  background: var(--vivid-sky-blue);
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

            {/* WhatsApp Floating Button with Attention Effects */}
            <a
                href="https://wa.me/56954277834?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group animate-pulse"
                aria-label="Contactar por WhatsApp"
            >
                {/* Pulsing rings for attention */}
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                <div className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-10 animation-delay-1000"></div>

                {/* Notification badge */}
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    !
                </div>

                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    ¡Hablemos por WhatsApp!
                </span>
            </a>







            {/* CTA Final Section */}
            <section className="py-20 bg-gradient-to-r from-[#0065E1] via-[#0085EE] to-[#01D0FF] text-[#000100]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                        ¿Listo para digitalizar tu empresa?
                    </h2>
                    <p className="text-lg text-[#FEFEFF] leading-relaxed mb-8 max-w-2xl mx-auto">
                        Transforma tu negocio con soluciones tecnológicas a medida.
                        Desde LunaSuite hasta sistemas personalizados, te ayudo a crecer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#contacto"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#000100] text-[#01D0FF] font-semibold rounded-2xl hover:bg-[#FEFEFF] hover:text-[#000100] transition-colors group shadow-xl/20"
                        >
                            Solicitar presupuesto
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="https://wa.me/56912345678?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#000100] text-[#000100] font-semibold rounded-2xl hover:bg-[#000100] hover:text-[#01D0FF] transition-colors shadow-xl/20"
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